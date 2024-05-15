import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { QuestionTextareaPropsType } from './interface'

const { TextArea } = Input
const PropComponent: FC<QuestionTextareaPropsType> = (props: QuestionTextareaPropsType) => {
  const { title, placeholder, onChange, disabled } = props
  //返回一个form实例 用于表单数据的双向绑定
  const [form] = Form.useForm()
  //当title和placeholder改变时，重新设置表单的值
  useEffect(() => {
    //当title和placeholder改变时，重新设置表单的值
    form.setFieldsValue({ title, placeholder })
  }, [title, placeholder])

  //当表单值改变时，调用onChange回调函数
  function handleValueChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, placeholder }}
      form={form}
      //当表单值改变时，调用handleValueChange
      onValuesChange={handleValueChange}
      disabled={disabled}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please enter the title.' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Placeholder" name="placeholder">
        <TextArea />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
