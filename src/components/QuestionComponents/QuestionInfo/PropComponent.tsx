import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { QuestionInfoPropsType } from './interface'

const { TextArea } = Input

const PropComponent: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  const { title, desc, onChange, disabled } = props
  useEffect(() => {
    form.setFieldsValue({ title, desc })
  }, [title, desc])

  const [form] = Form.useForm()
  function handleChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ title, desc }}
      onValuesChange={handleChange}
      form={form}
      disabled={disabled}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please enter a title!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Description" name="desc">
        <TextArea />
      </Form.Item>
    </Form>
  )
}
export default PropComponent
