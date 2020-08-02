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
import { getAllReceiver, editReceiver,  deleteReceiver} from './action';
import './Receivers.css';


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
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    record,
    index,
    children,
    ...restProps
  }) => {
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0
            }}
          >
            <Input />
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  const { authTokens } = useAuth();
  const [receivers, setReceivers] = useState([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

  useEffect(() => {
    getAllReceiver(authTokens.accessToken)
      .then(respone => respone.json())
      .then(res => {
        setReceivers(res.data);
      });
  }, []);

  const isEditing = record => record.accountNumber === editingKey;

  const edit = record => {
    form.setFieldsValue({
      accountNumber: '',
      memorizeName: '',
      title: '',
      ...record
    });
    setEditingKey(record.accountNumber);
  };

  const handleDelete = accountNumber => {
    const data = [...receivers];
    const newData = data.filter(item => item.accountNumber !== accountNumber);
    setReceivers(newData);
    deleteReceiver(authTokens.accessToken, accountNumber);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async accountNumber => {
    try {
      const row = await form.validateFields();
      const newData = [...receivers];
      const index = newData.findIndex(
        item => accountNumber === item.accountNumber
      );

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setReceivers(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setReceivers(newData);
        setEditingKey('');
      }

      editReceiver(
        authTokens.accessToken,
        newData[index].accountNumber,
        newData[index].type,
        newData[index].memorizeName
      );
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'Số tài khoản',
      dataIndex: 'accountNumber',
      width: '30%',
      editable: false
    },
    {
      title: 'Tên gợi nhớ',
      dataIndex: 'memorizeName',
      width: '30%',
      editable: true
    },
    {
      title: 'Loại ngân hàng',
      dataIndex: 'type',
      width: '30%',
      editable: false
    },
    {
      title: 'Hành động',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.accountNumber)}
              style={{
                marginRight: 8
              }}
            >
              Save
            </a>
            <Popconfirm title="Bạn muốn hủy?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <>
          <a disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </a>
              <Popconfirm title="Chắc chắn xóa?" onConfirm={() => handleDelete(record.accountNumber)}>
              <a className = "action-delete">Delete</a>
            </Popconfirm>
          </>
        );
      }
    }
  ];

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    };
  });

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
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell
            }
          }}
          bordered
          dataSource={receivers}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel
          }}
        />
      </Form>
    </Content>
  );
}
