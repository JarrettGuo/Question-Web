import React, { FC, useEffect } from 'react'
import { Checkbox, Form, Input } from 'antd'
import { QuestionParagraphPropsType } from './interface'

const { TextArea } = Input

const PropComponent: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text, isCenter, onChange, disabled } = props
  const [form] = Form.useForm()
  function handleValueChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  useEffect(() => {
    form.setFieldsValue({ text, isCenter })
  }, [text, isCenter])
  return (
    <Form
      layout="vertical"
      initialValues={{ text, isCenter }}
      disabled={disabled}
      onValuesChange={handleValueChange}
      form={form}
    >
      <Form.Item
        label="Paragraph content"
        name="text"
        rules={[{ required: true, message: 'Please enter the content of the paragraph.' }]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item label="Center" name="isCenter" valuePropName="checked">
        <Checkbox>Center</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
