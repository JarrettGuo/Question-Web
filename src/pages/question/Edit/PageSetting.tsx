import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { useDispatch } from 'react-redux'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { resetPageInfo } from '../../../store/pageInfoReducer'

const { TextArea } = Input
const PageSetting: FC = () => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const pageInfo = useGetPageInfo()
  //表单值变化时，更新页面信息 并且更新redux store中的pageInfo
  function handleValuesChange() {
    dispatch(resetPageInfo(form.getFieldsValue()))
  }
  //实时更新页面信息
  useEffect(() => {
    form.setFieldsValue(pageInfo)
  }, [pageInfo])
  return (
    <Form
      layout="vertical"
      initialValues={pageInfo}
      onValuesChange={handleValuesChange}
      form={form}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please enter the title.' }]}
      >
        <Input placeholder="Please enter the title." />
      </Form.Item>
      <Form.Item label="Description" name="desc">
        <TextArea placeholder="Please enter the description." />
      </Form.Item>
      <Form.Item label="CSS" name="css">
        <TextArea placeholder="Please enter the CSS style." />
      </Form.Item>
      <Form.Item label="JS" name="js">
        <TextArea placeholder="Please enter the JavaScript code." />
      </Form.Item>
    </Form>
  )
}

export default PageSetting
