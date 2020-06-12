import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import './Login.scss';
import { actions } from '@/store';
import API from '@/API';

export default function Login() {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  const [loginForm] = Form.useForm();
  const [isLogining, setIsLogining] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLoginBtn = useCallback(
    (evt) => {
      setIsLogining(true);
      loginForm.validateFields()
        .then((values) => {
          const {username, password} = values;
          // const password = loginForm.getFieldValue('password');
          console.log('username',username)
          return API.user.login(username, password);
        })
        .then((resData) => {
          if (resData == null) throw new Error('登录失败');
          setIsLogining(false);

          dispatch(actions.login.createSetRoles(resData.user.roles));
          dispatch(actions.login.createSetUser(resData.user));
          dispatch(history.push('/'));
        })
        .catch((errInfo) => {
          console.warn(errInfo);
          setIsLogining(false);

          // 验证失败
        });

      evt.preventDefault();
    },
    [Form],
  );

  return (
    <div className="pages-login">
      <div className="pages-login-main">
        <h1>登录</h1>
        <Form
          name="normal_login"
          className="login-form"
          form={loginForm}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            initialValue="admin"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            initialValue="admin"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            {/* <a className="login-form-forgot" href="">
              Forgot password
            </a> */}
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={handleLoginBtn}
              loading={isLogining}
              disabled={isLogining}
            >
              Log in
            </Button>
            {/* Or <a href="">register now!</a> */}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
