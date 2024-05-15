import React, { FC } from 'react'
import { Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { MANAGE_INDEX_PATHNAME } from '../router'

const NotFound: FC = () => {
  const navigate = useNavigate()
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => navigate(MANAGE_INDEX_PATHNAME)}>
          Back Home
        </Button>
      }
    ></Result>
  )
}
export default NotFound
