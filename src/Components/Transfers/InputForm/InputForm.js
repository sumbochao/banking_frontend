import React, { useState, useEffect, useReducer } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  getAllPartners,
  transferToPartner,
  getAllReceivers,
  sendCustomerOTP,
  verifyCustomerOTP,
  transferInLocal
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
  Result
} from 'antd';

import '../Transfers.css';

const { Content } = Layout;
const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;

const initialState = {
  partner: '',
  to_number: '',
  amount: '',
  type_fee: '',
  description: '',
  type_transaction: '',
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
        type_transaction: action.type_transaction
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

  const clickSubmitForm = val => {
    if(type === '0')
    {
      setTypeFeeVisible(true)
    }else{
    setModelVisible(true);
    sendCustomerOTP(authTokens.accessToken);
    let stk = '';
      if (type === '1') {
        stk = val.to_number;
      } else {
        stk = val.to_number_2;
      }
      if (props.bank === '2') {
        dispatch({
          type: 'GET_DATA',
          partner: val.partner,
          to_number: stk,
          amount: val.amount,
          type_fee: val.type_fee,
          description: val.description
        });
      } else {
        dispatch({
          type: 'GET_DATA',
          to_number: stk,
          amount: val.amount,
          description: val.description,
          type_transaction: val.type_transaction
        });
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
            return setSuccessVisible(true);
          } else {
            return setFailVisible(true);
          }
        } else {
          if (status.data.success === false) {
            return setFailVisible(true);
          } else {
            return setSuccessVisible(true);
          }
        }
      } else {
        if (status.status === 'success') {
          return setSuccessVisible(true);
        } else {
          setErr((status.err === "balance is not enoungh.") ? "Tài khoản không đủ" : (status.err === "sender and receiver must be different." ? "Tài khoản nhận phải khác tài khoản của bạn" : status.err))
          setFailVisible(true);
        }
      }
    }
  }, [isTransaction]);

  if (type === '2') {
    getAllReceivers(authTokens.accessToken)
      .then(respone => respone.json())
      .then(res => setReceivers(res.data))
      .catch(err => console.log(err));
  }
  return (
    <>
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
              <Select name="partner" defaultValue="1" style={{ marginTop: 20 }}>
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
              <Radio.Button value="NOI BO">Chuyển khoảng nội bộ</Radio.Button>
              <Radio.Button value="THANH TOAN NHAC NO">Thanh toán nhắc nợ</Radio.Button>
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
            defaultValue='0'
            onChange={value => setType(value)}
            style={{ marginTop: 20 }}
          >
            <Option value="0">Cách nhập số tài khoản</Option>
            <Option value="1">Nhập trực tiếp</Option>
            <Option value="2">Chọn từ danh sách</Option>
          </Select>
        </Form.Item>
        {type === '1' ? (
          <Form.Item
            label="Nhập số tài khoản"
            name="to_number"
            rules={[{ required: true, message: 'Vui lòng nhập số tài khoản' }]}
          >
            <Input name="to_number" style={{ marginTop: 20 }}></Input>
          </Form.Item>
        ) : type === '2' ? (
          <Form.Item
            label="Chọn số tài khoản"
            name="to_number_2"
            rules={[{ required: true, message: 'Vui lòng chọn số tài khoản' }]}
          >
            <Select style={{ marginTop: 20 }}>
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
          <Button type="primary" htmlType="submit" loading={isTransaction}>
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
        <Result status="error" title="Giao dịch thất bại. Kiểm tra lại." subTitle = {err}/>,
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
        <Result status="error" title="Vui lòng chọn cách nhập số tài khoản."/>,
      </Modal>
    </>
  );
}
