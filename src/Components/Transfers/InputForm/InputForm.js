import React, { useState, useEffect, useReducer } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  getAllPartners,
  transferToPartner,
  getAllReceivers,
  sendCustomerOTP,
  verifyCustomerOTP,
  transferInLocal,
  getAccountInfo
} from '../action';
import { useAuth } from '../../Routes/Context';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Layout,
  Tabs,
  Modal,
  Result,
  Card,
  Spin
} from 'antd';

import '../Transfers.css';
import { addReceiver } from '../../Receivers/action';
import Swal from 'sweetalert2';
import { el, tr } from 'date-fns/locale';

const { Option } = Select;
const { TextArea } = Input;

const initialState = {
  partner: '',
  to_number: '',
  amount: '',
  type_fee: '',
  description: '',
  type_transaction: '',
  is_save: ''
};

function reducer(state, action) {
  switch (action.type) {
    case 'GET_DATA':
      return {
        ...state,
        partner: action.partner,
        to_number: action.to_number,
        amount: action.amount,
        type_fee: action.type_fee,
        description: action.description,
        type_transaction: action.type_transaction,
        is_save: action.is_save
      };
    default:
      throw new Error();
  }
}

export default function InputForm(props) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [type, setType] = useState('0');
  const [receivers, setReceivers] = useState([]);
  const [status, setStatus] = useState();
  const { authTokens } = useAuth();
  const [isTransaction, setTransaction] = useState();
  const [modelVisible, setModelVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState();
  const [failVisible, setFailVisible] = useState();
  const [typeFeeVisible, setTypeFeeVisible] = useState();
  const [otp, setOTP] = useState('');
  const [verify, setVerify] = useState('none');
  const [state, dispatch] = useReducer(reducer, initialState);
  const [err, setErr] = useState('');
  const [accountNameState, setAccountNameState] = useState();
  const [partnerBankName, setPartnerBankName] = useState();
  const [stk, setStk] = useState('');
  const [partnerId, setPartnerId] = useState(0);
  const [loadingCheckButton, setLoadingCheckButton] = useState(false);
  const [loadingCheckButton2, setLoadingCheckButton2] = useState();
  var accountName;

  useEffect(() => {
    if (props.bank === '2') {
      getAllPartners(authTokens.accessToken)
        .then(response => response.json())
        .then(res => {
          setData(res.payload);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const clickSubmitForm = async val => {
    setPartnerBankName(data[partnerId - 1].bankingName);
    if (type === '2') {
      const account_temp = receivers.filter(item => item.accountNumber === stk);
      setAccountNameState(account_temp[0].memorizeName);
      setModelVisible(true);
      sendCustomerOTP(authTokens.accessToken);
      if (props.bank === '2') {
        dispatch({
          type: 'GET_DATA',
          partner: val.partner,
          to_number: val.to_number_2,
          amount: val.amount,
          type_fee: val.type_fee,
          description: val.description,
          is_save: val.is_save
        });
      } else {
        dispatch({
          type: 'GET_DATA',
          to_number: val.to_number_2,
          amount: val.amount,
          description: val.description,
          type_transaction: val.type_transaction,
          is_save: val.is_save
        });
      }
    } else {
      if (partnerId === 2) {
        setLoadingCheckButton2(true);
        await getAccountInfo(authTokens.accessToken, partnerId, stk)
          .then(respone => respone.json())
          .then(res => {
            accountName = res.data.name;
            setAccountNameState(res.data.name);
          })
          .catch(err => console.log(err))
          .finally(() => setLoadingCheckButton2(false));
        if (accountName === undefined) {
          Swal.fire({
            icon: 'error',
            title: 'Không tìm thấy tài khoản'
          });
        } else {
          setModelVisible(true);
          sendCustomerOTP(authTokens.accessToken);
          if (props.bank === '2') {
            dispatch({
              type: 'GET_DATA',
              partner: val.partner,
              to_number: val.to_number,
              amount: val.amount,
              type_fee: val.type_fee,
              description: val.description,
              is_save: val.is_save
            });
          } else {
            dispatch({
              type: 'GET_DATA',
              to_number: val.to_number,
              amount: val.amount,
              description: val.description,
              type_transaction: val.type_transaction,
              is_save: val.is_save
            });
          }
        }
      } else {
        if (partnerId === 3) {
          setLoadingCheckButton2(true);
          await getAccountInfo(authTokens.accessToken, partnerId, stk)
            .then(respone => respone.json())
            .then(res => {
              accountName = res.ten;
              setAccountNameState(res.ten);
            })
            .catch(err => console.log(err))
            .finally(() => setLoadingCheckButton2(false));
          if (accountName === undefined) {
            Swal.fire({
              icon: 'error',
              title: 'Không tìm thấy tài khoản'
            });
          } else {
            setModelVisible(true);
            sendCustomerOTP(authTokens.accessToken);
            if (props.bank === '2') {
              dispatch({
                type: 'GET_DATA',
                partner: val.partner,
                to_number: val.to_number,
                amount: val.amount,
                type_fee: val.type_fee,
                description: val.description,
                is_save: val.is_save
              });
            } else {
              dispatch({
                type: 'GET_DATA',
                to_number: val.to_number,
                amount: val.amount,
                description: val.description,
                type_transaction: val.type_transaction,
                is_save: val.is_save
              });
            }
          }
        }
      }
    }
  };

  const clickVerifyOTP = val => {
    verifyCustomerOTP(authTokens.accessToken, val.otp)
      .then(respone => respone.json())
      .then(res => {
        setVerify(res.status);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (verify === 'success') {
      setModelVisible(false);
      setTransaction(true);
      if (props.bank === '2') {
        transferToPartner(
          authTokens.accessToken,
          state.partner,
          state.to_number,
          state.amount,
          state.description,
          state.type_fee
        )
          .then(respone => respone.json())
          .then(res => {
            setStatus(res);
          })
          .catch(err => console.log(err))
          .finally(() => {
            setTransaction(false);
          });
      } else {
        transferInLocal(
          authTokens.accessToken,
          state.to_number,
          state.amount,
          state.description,
          state.type_transaction
        )
          .then(respone => respone.json())
          .then(res => {
            setStatus(res);
          })
          .catch(err => console.log(err))
          .finally(() => {
            setTransaction(false);
          });
      }
    }
  }, [verify]);

  function handleInputChange(e) {
    setStk(e.target.value);
  }

  const checkAccountNumber = async () => {
    if (props.bank === '2') {
      if (partnerId === 0) {
        Swal.fire('Bạn cần phải chọn ngân hàng');
      } else {
        if (stk === '' || stk === undefined) {
          Swal.fire('Bạn phải nhập số tài khoản');
        } else {
          if (partnerId === 2) {
            setLoadingCheckButton(true);
            await getAccountInfo(authTokens.accessToken, partnerId, stk)
              .then(respone => respone.json())
              .then(res => {
                accountName = res.data.name;
                setAccountNameState(res.data.name);
              })
              .catch(err => console.log(err))
              .finally(() => setLoadingCheckButton(false));
            if (accountName === undefined) {
              Swal.fire({
                icon: 'error',
                title: 'Không tìm thấy tài khoản'
              });
            } else {
              setPartnerBankName(data[partnerId - 1].bankingName);
              Swal.fire(
                accountName,
                'Số tài khoản: ' +
                  stk +
                  ' - ' +
                  'Ngân hàng: ' +
                  data[partnerId - 1].bankingName,
                'success'
              );
            }
          } else {
            if (partnerId === 3) {
              setLoadingCheckButton(true);
              await getAccountInfo(authTokens.accessToken, partnerId, stk)
                .then(respone => respone.json())
                .then(res => {
                  accountName = res.ten;
                  setAccountNameState(res.ten);
                })
                .catch(err => console.log(err))
                .finally(() => setLoadingCheckButton(false));
              if (accountName === undefined) {
                Swal.fire({
                  icon: 'error',
                  title: 'Không tìm thấy tài khoản'
                });
              } else {
                setPartnerBankName(data[partnerId - 1].bankingName);
                Swal.fire(
                  accountName,
                  'Số tài khoản: ' +
                    stk +
                    ' - ' +
                    'Ngân hàng: ' +
                    data[partnerId - 1].bankingName,
                  'success'
                );
              }
            }
          }
        }
      }
    }
  };
  const onOkModel = () => {
    sendCustomerOTP(authTokens.accessToken);
  };

  const onCancelModel = () => {
    setModelVisible(false);
  };
  const onSuccesModel = () => {
    setSuccessVisible(false);
  };
  const onFailModel = () => {
    setFailVisible(false);
  };
  const onTypeFeeModel = () => {
    setTypeFeeVisible(false);
  };
  useEffect(() => {
    if (isTransaction === false) {
      if (props.bank === '2') {
        if (state.partner === 3) {
          if (status.status === 1) {
            if (state.is_save === '0') {
              addReceiver(
                authTokens.accessToken,
                state.to_number,
                '',
                'LIEN NGAN HANG'
              );
            }
            setSuccessVisible(true);
          } else {
            setFailVisible(true);
          }
        } else {
          if (status.data.success === false) {
            setFailVisible(true);
          } else {
            if (state.is_save === '0') {
              addReceiver(
                authTokens.accessToken,
                state.to_number,
                '',
                'LIEN NGAN HANG'
              );
            }
            setSuccessVisible(true);
          }
        }
      } else {
        if (status.status === 'success') {
          if (state.is_save === '0') {
            addReceiver(authTokens.accessToken, state.to_number, '', 'NOI BO');
          }
          setSuccessVisible(true);
        } else {
          setErr(
            status.err === 'balance is not enoungh.'
              ? 'Tài khoản không đủ'
              : status.err === 'sender and receiver must be different.'
              ? 'Tài khoản nhận phải khác tài khoản của bạn'
              : status.err
          );
          setFailVisible(true);
        }
      }
    }
  }, [isTransaction]);

  useEffect(() => {
    if (type === '2') {
      getAllReceivers(authTokens.accessToken)
        .then(respone => respone.json())
        .then(res => setReceivers(res.data))
        .catch(err => console.log(err));
    }
  }, [type]);

  return (
    <>
      {isTransaction ? <Spin tip="Đang xử lý giao dịch..."></Spin> : <></>}
      <Form
        name="basic"
        onFinish={clickSubmitForm}
        labelCol={{
          span: 5
        }}
        wrapperCol={{
          span: 14
        }}
        layout="horizontal"
      >
        {props.bank === '2' ? (
          <Form.Item
            label="Ngân hàng"
            name="partner"
            rules={[{ required: true, message: 'Vui lòng chọn ngân hàng' }]}
          >
            {isLoading ? (
              <Select
                defaultValue="Chọn ngân hàng"
                style={{ marginTop: 20 }}
              ></Select>
            ) : (
              <Select
                name="partner"
                defaultValue="1"
                style={{ marginTop: 20 }}
                onChange={value => setPartnerId(value)}
              >
                {data.map(item => {
                  return <Option value={item.id}>{item.bankingName}</Option>;
                })}
              </Select>
            )}
          </Form.Item>
        ) : (
          <Form.Item
            label="Loại giao dịch"
            name="type_transaction"
            rules={[
              { required: true, message: 'Vui lòng chọn loại giao dịch' }
            ]}
          >
            <Radio.Group style={{ marginTop: 20 }} name="type_transaction">
              <Radio.Button value="NOI BO">Chuyển khoản nội bộ</Radio.Button>
              <Radio.Button value="THANH TOAN NHAC NO">
                Thanh toán nhắc nợ
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
        )}
        <Form.Item
          label="Cách nhập người nhận"
          name="type_receiver"
          rules={[
            { required: true, message: 'Vui lòng chọn cách nhập số tài khoản' }
          ]}
        >
          <Select
            name="type_receiver"
            defaultValue="Cách nhập số tài khoản"
            onChange={value => setType(value)}
            style={{ marginTop: 20 }}
          >
            <Option value="1">Nhập trực tiếp</Option>
            <Option value="2">Chọn từ danh sách</Option>
          </Select>
        </Form.Item>
        {type === '1' ? (
          <>
            <Form.Item
              label="Nhập số tài khoản"
              name="to_number"
              rules={[
                { required: true, message: 'Vui lòng nhập số tài khoản' }
              ]}
            >
              <Input
                name="to_number"
                style={{ marginTop: 20 }}
                value={stk}
                onChange={handleInputChange}
              ></Input>
            </Form.Item>
            <Button
              type="primary"
              onClick={checkAccountNumber}
              loading={loadingCheckButton}
              style={{ marginLeft: 222 }}
            >
              Kiểm tra
            </Button>
            <Form.Item
              label="Lưu lại số tài khoản"
              name="is_save"
              rules={[{ required: true, message: 'Vui lòng chọn một' }]}
            >
              <Radio.Group style={{ marginTop: 20 }} name="is_save">
                <Radio.Button value="0">Lưu</Radio.Button>
                <Radio.Button value="1">Không lưu</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </>
        ) : type === '2' ? (
          <Form.Item
            label="Chọn số tài khoản"
            name="to_number_2"
            rules={[{ required: true, message: 'Vui lòng chọn số tài khoản' }]}
          >
            <Select style={{ marginTop: 20 }} onSelect={value => setStk(value)}>
              {receivers.map(item => {
                return (
                  <Option value={item.accountNumber} className="select-stk">
                    <a>Số tài khoản: {item.accountNumber}</a>
                    <br></br>
                    <br></br>
                    <a>Tên tài khoản: {item.memorizeName}</a>
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        ) : (
          <></>
        )}
        <Form.Item
          label="Số tiền"
          name="amount"
          rules={[{ required: true, message: 'Vui lòng nhập số tiền' }]}
        >
          <Input name="amount" type="number" style={{ marginTop: 20 }}></Input>
        </Form.Item>
        <Form.Item
          label="Nội dung"
          name="description"
          rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
        >
          <TextArea
            rows={4}
            name="description"
            style={{ marginTop: 20 }}
          ></TextArea>
        </Form.Item>
        {props.bank === '2' ? (
          <Form.Item
            label="Phương thức trả phí"
            name="type_fee"
            rules={[
              { required: true, message: 'Vui lòng chọn phương thức trả phí' }
            ]}
          >
            <Radio.Group style={{ marginTop: 20 }} name="type_fee">
              <Radio.Button value="1">Người gửi trả</Radio.Button>
              <Radio.Button value="2">Người nhận trả</Radio.Button>
            </Radio.Group>
          </Form.Item>
        ) : (
          <></>
        )}

        <Form.Item
          wrapperCol={{
            span: 4,
            push: 5
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            loading={loadingCheckButton2}
          >
            Chuyển tiền
          </Button>
        </Form.Item>
      </Form>
      <Modal
        title="Kiểm tra mã OTP trong email của bạn để xác nhận giao dịch"
        visible={modelVisible}
        onOk={onOkModel}
        onCancel={onCancelModel}
        okType="danger"
        okText="Gửi lại"
        cancelText="Quay lại"
      >
        <Form
          name="otp_form"
          onFinish={clickVerifyOTP}
          labelCol={{
            span: 6
          }}
          wrapperCol={{
            span: 14
          }}
          layout="horizontal"
        >
          <Card
            title="Thông tin giao dịch"
            bordered={false}
            style={{ width: 300 }}
          >
            <p>Người nhận: {accountNameState}</p>
            <p>Số tài khoản: {state.to_number}</p>
            <p>Ngân hàng: {partnerBankName}</p>
            <p>Số tiền: {state.amount}</p>
            <p>Nội dung: {state.description}</p>
            <p>
              Bên trả phí:{' '}
              {state.type_fee === '1' ? 'Người gửi trả' : 'Người nhận trả'}
            </p>
          </Card>
          <Form.Item
            label="Nhập mã OTP"
            name="otp"
            rules={[{ required: true, message: 'Vui lòng nhập mã OTP' }]}
          >
            <Input
              name="otp"
              type="number"
              placeholder="Nhập mã OTP được gửi qua email"
              style={{ marginTop: 20 }}
            ></Input>
          </Form.Item>
          {verify === 'fail' ? (
            <p style={{ color: 'red' }}>OTP không chính xác hoặc hết hạn</p>
          ) : (
            <></>
          )}
          <Form.Item
            wrapperCol={{
              span: 4,
              push: 6
            }}
          >
            <Button type="primary" htmlType="submit" loading={isTransaction}>
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title=""
        visible={successVisible}
        footer={[
          <Button key="success" onClick={onSuccesModel}>
            Xác nhận
          </Button>
        ]}
      >
        <Result status="success" title="Giao dịch thành công!" />,
      </Modal>
      <Modal
        title=""
        visible={failVisible}
        footer={[
          <Button key="danger" onClick={onFailModel}>
            Xác nhận
          </Button>
        ]}
      >
        <Result
          status="error"
          title="Giao dịch thất bại. Kiểm tra lại."
          subTitle={err}
        />
        ,
      </Modal>
      <Modal
        title=""
        visible={typeFeeVisible}
        footer={[
          <Button key="danger" onClick={onTypeFeeModel}>
            Xác nhận
          </Button>
        ]}
      >
        <Result status="error" title="Vui lòng chọn cách nhập số tài khoản." />,
      </Modal>
    </>
  );
}
