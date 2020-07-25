import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { getAllPartners } from '../action';
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
  Tabs
} from 'antd';
import { WindowsFilled } from '@ant-design/icons';
const { Content } = Layout;
const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;
export default function InputForm() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { authTokens } = useAuth();
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

  return (
    <>
      <Form
        labelCol={{
          span: 4
        }}
        wrapperCol={{
          span: 14
        }}
        layout="horizontal"
      >
        <Form.Item label="Ngân hàng">
          {isLoading ? (
            <Content>
              <Select
                defaultValue="Chọn ngân hàng"
                style={{ marginTop: 10 }}
              ></Select>
            </Content>
          ) : (
            <Content>
              <Select defaultValue="1" style={{ marginTop: 10 }}>
                {data.map(item => {
                  return <Option value={item.id}>{item.bankingName}</Option>;
                })}
              </Select>
            </Content>
          )}
        </Form.Item>
        <Form.Item label="Người nhận">
          <Tabs
            style={{ width: '30%', backgroundColor: '#FFFFFF' }}
            defaultActiveKey="1"
          >
            <TabPane tab="Nhập trực tiếp" key="1">
              <Input placeholder="Số tài khoản" style={{ marginTop: 3 }} />
            </TabPane>
            <TabPane tab="Chọn từ danh sách" key="2"></TabPane>
          </Tabs>
        </Form.Item>
        <Form.Item label="Nội dung">
          <TextArea rows={4}></TextArea>
        </Form.Item>
        <Form.Item name="radio-button" label="Phương thức trả phí">
          <Radio.Group style={{ marginTop: 5 }}>
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
