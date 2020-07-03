import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { updateAdmin } from './api';

const { Option } = Select;

export const UpdateAdmin = props => {
  const { visible, setVisible, dataControll, oldData } = props;
  const [confirmLoading, setConfirm] = useState(false);
  const data = dataControll[0];
  const setData = dataControll[1];
  const [form] = Form.useForm();

  const addComplete = res => {
    setConfirm(false);
    if (res) {
      const temp = [...data];
      const findID = element => element.id === res.admin.id;
      temp[temp.findIndex(findID)] = res.admin;
      setData(temp);
      message.success('Sửa thành công', 1, setVisible(false));
    } else {
      message.error('Không thể sửa');
    }
  };
  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      setConfirm(true);
      updateAdmin(values, addComplete);
    } catch (errorInfo) {
      console.log(errorInfo);
    }
  };
  const handleCancel = () => {
    setConfirm(false);
    setVisible(false);
  };

  const onFill = params => {
    form.setFieldsValue({
      id: params.id,
      adminname: params.adminname,
      email: params.email,
      type: params.type
    });
  };

  useEffect(() => {
    onFill(oldData);
  });

  return (
    <div>
      <Modal
        getContainer={false}
        title="Cập nhật"
        visible={visible}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        onOk={onFinish}
      >
        <Form
          form={form}
          name="UpdateForm"
          className="login-form"
          initialValues={{ remember: true }}
          style={{ border: 'none' }}
        >
          <Form.Item name="id" style={{ display: 'none' }}>
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                required: true,
                message: 'Email không hợp lệ!'
              }
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder={oldData.email}
            />
          </Form.Item>
          <Form.Item
            name="adminname"
            rules={[{ min: 6, required: true, message: 'Tên không hợp lệ!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} />
          </Form.Item>
          <Form.Item
            name="type"
            rules={[{ required: true, message: 'Chọn một vai trò!' }]}
          >
            <Select allowClear size="large">
              <Option value="Admin quản lí bài viết">
                Admin quản lí bài viết
              </Option>
              <Option value="Admin quản lí tài khoản">
                Admin quản lí tài khoản
              </Option>
              <Option value="Admin quản lí công ty">
                Admin quản lí công ty
              </Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
