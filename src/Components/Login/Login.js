import React, { useState } from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Layout, Row, Col, Form, Input, Button } from 'antd';
import Swal from 'sweetalert2';
import { login } from '../../Reducers/Actions';
import { useAuth } from '../Routes/Context';

import './Login.css';

const { Content } = Layout;

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
    <Layout className="site-layout">
      <Content>
        <Row>
          <Col className="col-login" span={24} style={{ display: 'flex' }}>
            <Form className="login-form" name="basic" onFinish={loginClick}>
              <div style={{ textAlign: 'center', marginBottom: 50 }}>
                <img alt="" src="extalk_logo.png" style={{ width: '150px' }} />

                <h3
                  style={{
                    fontWeight: 'bold',
                    marginBottom: 10,
                    color: 'rgba(0, 0, 0, 0.8)'
                  }}
                >
                  Đăng nhập vào Admin Panel
                </h3>
              </div>
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Trống' }]}
              >
                <Input
                  name="username"
                  placeholder="Email"
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
                rules={[{ required: true, message: 'Trống' }]}
              >
                <Input.Password
                  name="password"
                  placeholder="Password"
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
        </Row>
      </Content>
    </Layout>
  );
};

export default Login;
