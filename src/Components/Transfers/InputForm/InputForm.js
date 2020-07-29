import React, { useState, useEffect, useReducer } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { getAllPartners, transferToPartner, getAllReceivers, sendCustomerOTP, verifyCustomerOTP } from '../action';
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
  
}

function reducer(state, action) {
  switch (action.type) {
      case "GET_DATA":
          return {...state, partner: action.partner, to_number: action.to_number, amount: action.amount, type_fee: action.type_fee, description: action.description}
      default:
          throw new Error();
  }
}

export default function InputForm() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [type, setType] = useState('0');
  const [receivers, setReceivers] = useState([]);
  const [status, setStatus] = useState();
  const { authTokens } = useAuth();
  const [isTransaction, setTransaction] = useState();
  const [modelVisible, setModelVisible] = useState(false);
  const [otp, setOTP] = useState('');
  const [verify, setVerify] = useState('none');
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
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
  }, []);

  const clickSubmitForm = val => {
    setModelVisible(true);
    sendCustomerOTP(authTokens.accessToken)
    let stk = '';
    if (type === '1') {
      stk = val.to_number;
    } else {
      stk = val.to_number_2;
    }
    
    dispatch({type: "GET_DATA", partner: val.partner, to_number: stk, amount: val.amount, type_fee: val.type_fee, description: val.description})

  };

  const clickVerifyOTP = val =>
  {
    verifyCustomerOTP(authTokens.accessToken, val.otp)
    .then(respone => respone.json())
    .then(res => {
      setVerify(res.status)
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    if(verify === 'success')
    {
      setModelVisible(false)
      setTransaction(true);
      
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
          setTransaction(false)
        })
    }
  }, [verify])


  const onOkModel = () =>
  {
    sendCustomerOTP(authTokens.accessToken)
  }

  const onCancelModel = () =>
  {
    setModelVisible(false)
  }

  useEffect(()=>{
    if (isTransaction === false) {
      if (state.partner === '3') {
        if (status.status === 1) {
          return alert('Giao dịch thành công!');
        } else {
          return alert(status.msg);
        }
      } else {
        if (status.data.success === false) {
          return alert(status.data.error);
        } else {
          return alert('Giao dịch thành công!');
        }
      }
    }
  }, [isTransaction])

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
        <Form.Item
          label="Cách nhập người nhận"
          name="type_receiver"
          rules={[{ required: true, message: 'Vui lòng chọn một' }]}
        >
          <Select
            name="type_receiver"
            defaultValue="0"
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
        ) : (type === '2' ? (
          (
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
          )
        ) : (<></>))}
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
        <Form.Item
          name="radio-button"
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
          okType = 'danger'
          okText = 'Gửi lại'
          cancelText = 'Quay lại'
        >
          <Form
          name="otp_form"
          onFinish = {clickVerifyOTP}
          labelCol={{
            span: 6
          }}
          wrapperCol={{
            span: 14
          }}
          layout="horizontal">
            <Form.Item
            label = "Nhập mã OTP"
            name = "otp"
            rules={[
              { required: true, message: 'Vui lòng nhập mã OTP' }
            ]}
            >
               <Input name="otp" type = "number" placeholder = "Nhập mã OTP được gửi qua email" style={{ marginTop: 20 }}></Input>
            </Form.Item>
            {(verify === "fail") ? (
              <p style = {{color: 'red'}}>OTP không chính xác hoặc hết hạn</p>
            ): (<></>)}
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
    </>
  );
}
