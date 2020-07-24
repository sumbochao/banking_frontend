import React, { useState } from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import {  Col, Form, Input, Button, message, Row } from 'antd';
import {Link} from 'react-router-dom';
import ReCAPTCHA from 'react-grecaptcha';
import { useAuth } from '../Routes/Context';

import './Login.css';
import { login } from './action';

// eslint-disable-next-line no-unused-vars
const Login = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [isEmployee, setEmployee] = useState(false);
  const { setAuthTokens } = useAuth();
  const loginFinish = res => {
    if (res.accessToken) {
      setAuthTokens(res); 
    } else {
      message.error('Sai mật khẩu');
      setLoading(false);
    }
  };
  const loginClick = val => {
    setLoading(!isLoading);
    login(val.username, val.password, loginFinish);
  };

  const callback =  ()=> {};
  const expiredCallback =  ()=> {};
  const handleForgotPasswordClick = () =>{
    message.success("Hệ thống đã gửi mã OTP để quý khách đổi mật khẩu");
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
                > {!isEmployee? "Đăng nhập vào Hệ thống Monca Banking" : "Đăng nhập dành cho nhân viên"}
                </h3>
              </div>
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Vui lòng nhập email' }]}
              >
                <Input
                  size='small'
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
                  size='small'
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
                <ReCAPTCHA
                      sitekey="6LefHbUZAAAAALh8oMYUOqZbSjSHAugla1527pN0"
                      callback={callback}
                      expiredCallback={expiredCallback}
                      locale="en"
                  />
              </Form.Item>
                <Row style={{ marginTop: 20 }} justify = "space-around">
                <Col>
                {!isEmployee ? (
                  <div>
                  <p
                    style={{
                    fontSize: '12px',
                      }}>
                     Quên mật khẩu?
                  </p>
                  <Link
                    to="/forgot"
                    style={{
                      fontSize: '15px',
                      color: '#F55D3E',
                      fontWeight: 'bold'
                    }}
                    onClick={handleForgotPasswordClick}
                  >
                    Lấy lại mật khẩu
                  </Link>
                  </div>
                ) : (' ')}
            </Col>
            <Col>
            <Form.Item>
                <Button
                  className="custom-button"
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                >
                  Đăng nhập
                </Button>
            </Form.Item>
            </Col>
            </Row>
          </Form>
          </Col>
        </div>
  );
};

export default Login;
