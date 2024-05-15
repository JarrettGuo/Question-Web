import React, { FC, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Typography, Space, Button, Form, Input, Checkbox, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import { REGISTER_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router'
import { loginService } from '../services/user'
import { loginReducer } from '../store/userReducer'
import { setToken } from '../utils/user-token'
import styles from './Login.module.scss'

const { Title } = Typography

const USERNAME_KEY = 'USERNAME'
const PASSWORD_KEY = 'PASSWORD'

// 从localStorage中记录用户信息
function remberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username)
  localStorage.setItem(PASSWORD_KEY, password)
}
// 从localStorage中删除用户信息
function deleteUserFromStorage() {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(PASSWORD_KEY)
}
// 从localStorage中获取用户信息
function getUserFromStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  }
}

const Login: FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  //第三方库antd的Form组件 用于表单的提交
  const [form] = Form.useForm()

  useEffect(() => {
    const { username, password } = getUserFromStorage()
    form.setFieldsValue({ username, password })
  }, [])
  const { run } = useRequest(
    async (username: string, password: string) => {
      const data = await loginService(username, password)
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        //获取token
        const { token = '', username, nickname } = result
        //将token存储到本地
        setToken(token)
        message.success('Login successfully')
        //将用户信息存储到redux
        dispatch(loginReducer({ username, nickname }))
        //跳转到管理页面
        navigate(MANAGE_INDEX_PATHNAME)
      },
    }
  )
  const onFinish = (values: any) => {
    //获取表单的值
    const { username, password, remember } = values || {}

    //执行ajax请求
    run(username, password)
    //让浏览器记住用户信息
    if (remember) {
      remberUser(username, password)
    } else {
      deleteUserFromStorage()
    }
  }
  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>User Login</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          initialValues={{ remember: true }}
          form={form}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: 'Please enter the username.' },
              { type: 'string', min: 6, max: 20, message: 'Username length 6-20 characters.' },
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
            rules={[{ required: true, message: 'Please enter the password' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
              <Link to={REGISTER_PATHNAME}>Create an account</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
