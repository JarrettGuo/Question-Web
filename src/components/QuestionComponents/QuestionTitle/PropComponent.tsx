import React, { FC, useEffect } from 'react'
import { Form, Input, Checkbox, Select } from 'antd'
import { QuestionTitlePropsType } from './interface'

const PropComponent: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
  const { text, level, isCenter, onChange, disabled } = props
  //返回一个form实例 用于表单数据的双向绑定
  const [form] = Form.useForm()
  //当title和placeholder改变时，重新设置表单的值
  useEffect(() => {
    //当title和placeholder改变时，重新设置表单的值
    form.setFieldsValue({ text, level, isCenter })
  }, [text, level, isCenter])

  //当表单值改变时，调用onChange回调函数
  function handleValueChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ text, level, isCenter }}
      //当表单值改变时，调用handleValueChange
      onValuesChange={handleValueChange}
      form={form}
      disabled={disabled}
    >
      <Form.Item
        label="Title content"
        name="text"
        rules={[{ required: true, message: 'Please enter the title content.' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Level" name="level">
        <Select
          options={[
            { value: 1, text: 1 },
            { value: 2, text: 2 },
            { value: 3, text: 3 },
            { value: 4, text: 4 },
            { value: 5, text: 5 },
          ]}
        ></Select>
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>Center</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
