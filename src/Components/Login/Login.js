import React, { useState } from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import {  Col, Form, Input, Button } from 'antd';
import Swal from 'sweetalert2';
import { login } from '../../Reducers/Actions';
import { useAuth } from '../Routes/Context';

import './Login.css';

const Login = () => {
  const [isLoading, setLoading] = useState(false);
  const { setAuthTokens } = useAuth();
  const loginFinish = res => {
    if (res.accessToken) {
      setAuthTokens(res);
    } else {
      Swal.fire('Thông báo', 'Sai mật khẩu', 'error');
      setLoading(false);
    }
  };
  const loginClick = val => {
    setLoading(!isLoading);
    login(val.username, val.password, loginFinish);
  };

  return (
        <div className="layout-login">
          <Col className="col-login" span={24} style={{ display: 'flex' }}>
            <Form className="login-form" name="basic" onFinish={loginClick}>
              <div style={{ textAlign: 'center', marginBottom: 50 }}>
                <img alt="" src="bankicon.png" style={{ width: '150px' }} />
                <h3
                  style={{
                    fontWeight: 'bold',
                    marginBottom: 10, 
                    color: 'rgba(0, 0, 0, 0.8)'
                  }}
                >
                  Đăng nhập vào Hệ thống Monca Banking
                </h3>
              </div>
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Vui lòng nhập email' }]}
              >
                <Input
                  name="username"
                  placeholder="Email"
                  style={{
                      borderRadius: 25,
                  }}
                  prefix={
                    <MailOutlined
                      type="lock"
                      style={{ color: 'rgba(0,0,0,.25)' }}
                    />
                  }
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
              >
                <Input.Password
                  name="password"
                  placeholder="Password"
                  style={{
                      borderRadius: 25,
                  }}
                  prefix={
                    <LockOutlined
                      type="lock"
                      style={{ color: 'rgba(0,0,0,.25)' }}
                    />
                  }
                />
              </Form.Item>
              <Form.Item>
                <Button
                  className="custom-button"
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  style={{ float: 'right', margin: 0 }}
                >
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </div>
  );
};

export default Login;
