import React, { FC } from 'react'
import { Typography, Space, Form, Input, Button, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { LOGIN_PATHNAME } from '../router'
import { registerService } from '../services/user'
import styles from './Register.module.scss'

const { Title } = Typography

const Register: FC = () => {
  const navigate = useNavigate()
  //使用 useRequest 创建一个请求实例，run 方法用于触发请求，请求成功后会自动触发重新渲染
  const { run } = useRequest(
    async values => {
      const { username, password, nickname } = values
      await registerService(username, password, nickname)
    },
    {
      manual: true, // 手动触发
      onSuccess() {
        message.success('Successfully registered, please log in')
        navigate(LOGIN_PATHNAME)
      },
    }
  )

  // onFinish 方法会在表单验证通过后触发，values 参数是表单的值 当用户点击注册按钮时，会触发 onFinish 方法，将表单的值传递给 run 方法，run 方法会调用注册接口
  const onFinish = (values: any) => {
    run(values)
  }
  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>Register New User</Title>
        </Space>
      </div>
      <div>
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: 'Please enter the username.' },
              {
                type: 'string',
                min: 6,
                max: 20,
                message: 'Username length 6-20 characters.',
              },
              {
                pattern: /^[a-zA-Z0-9_]+$/,
                message: 'Usernames can only contain letters, numbers, and underscores.',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password.' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['password']} // 依赖password字段, 一旦password字段变化，就会重新校验
            // 自定义校验规则 两次输入的密码是否一致
            rules={[
              { required: true, message: 'Please enter the confirmation password.' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Inconsistent passwords entered twice.'))
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label="Nickname" name="nickname">
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
              <Link to={LOGIN_PATHNAME}>Login</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Register
