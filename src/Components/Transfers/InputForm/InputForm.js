import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { getAllPartners, transferToPartner, getAllReceivers } from '../action';
import { useAuth } from '../../Routes/Context';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Layout,
  Row,
  Col,
  Tabs,
  Table,
  Card
} from 'antd';
import { WindowsFilled } from '@ant-design/icons';
import { value } from 'numeral';

import '../Transfers.css';

const { Content } = Layout;
const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;
export default function InputForm() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [type, setType] = useState('1');
  const [receivers, setReceivers] = useState([]);
  const [status, setStatus] = useState();
  const { authTokens } = useAuth();
  const [isFinalTransaction, setFinalTransaction] = useState(false);
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
  let partner = '0';
  const clickSubmitForm = val => {
    let stk = '';
    if (type === '2') {
      stk = val.to_number;
    } else {
      stk = val.to_number_2;
    }
    partner = val.partner;
    setFinalTransaction(false);
    transferToPartner(
      authTokens.accessToken,
      val.partner,
      stk,
      val.amount,
      val.description,
      val.type_fee
    )
      .then(respone => respone.json())
      .then(res => {
        setStatus(res);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setFinalTransaction(true)
      })


    
  };

  useEffect(()=>{
    if (isFinalTransaction === true) {
      if (partner === '3') {
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
  }, [isFinalTransaction])

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
          rules={[{ required: true, message: 'Vui lòng chọn ngân hàng' }]}
        >
          <Select
            defaultValue="1"
            value={type}
            onChange={value => setType(value)}
            style={{ marginTop: 20 }}
          >
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
        ) : (
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
            push: 4
          }}
        >
          <Button type="primary" htmlType="submit">
            Chuyển tiền
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
