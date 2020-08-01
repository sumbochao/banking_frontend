import React, { useEffect, useState } from 'react';
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Layout,
  Col,
  Row,
  Typography
} from 'antd';
import { WindowsFilled } from '@ant-design/icons';
import { useAuth } from '../Routes/Context';
import { getAllReceiver } from './action';

const { Content } = Layout;
const { Title } = Typography;

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};

export default function Receivers() {
  const { authTokens } = useAuth();
  const [receivers, setReceivers] = useState([]);

  useEffect(() => {
    getAllReceiver(authTokens.accessToken)
      .then(respone => respone.json())
      .then(res =>
        {setReceivers(res.data)
        console.log(res);}
         );
  }, []);

  const columns = [
    {
      title: 'Số tài khoản',
      dataIndex: 'accountNumber',
      width: '30%',
    },
    {
        title: 'Tên gợi nhớ',
        dataIndex: 'memorizeName',
        width: '30%',
      },
      {
        title: 'Loại ngân hàng',
        dataIndex: 'type',
        width: '30%',
      },
  ];
 
  return (
    <Content
      className="receivers"
      style={{
        padding: 20,
        borderRadius: 10
      }}
    >
      <Row>
        <Col span={18}>
          <Title level={3}>
            <WindowsFilled /> QUẢN LÝ DANH SÁCH NGƯỜI NHẬN
          </Title>
        </Col>
      </Row>
        <Table
          bordered
          dataSource={receivers}
          columns={columns}
          rowClassName="editable-row"
        />
    </Content>
  );
}
