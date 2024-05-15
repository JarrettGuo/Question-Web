import React, { FC, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { Form, Input, Checkbox, Select, Button, Space } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { QuestionRadioPropsType, OptionType } from './interface'

const PropComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const [form] = Form.useForm()
  const { title, isVertical, value, options = [], disabled, onChange } = props

  function handleValuesChange() {
    if (onChange == null) return
    //触发onChange事件
    const newValues = form.getFieldsValue() as QuestionRadioPropsType
    //过滤掉options中text为null的选项
    if (newValues.options) {
      newValues.options = newValues.options.filter(option => !(option.text == null))
    }
    //提取newValues中的options
    const { options = [] } = newValues
    //遍历所有选项，如果选项没有value值，就生成一个
    options.forEach(option => {
      //当option有value值时，不生成新的value值
      if (option.value) return
      //如果选项没有value值，就生成一个
      option.value = nanoid(5)
    })
    // console.log('newValues', newValues)
    onChange(newValues)
  }
  useEffect(() => {
    form.setFieldsValue({ title, isVertical, value, options })
  }, [title, isVertical, value, options])
  return (
    <Form
      layout="vertical"
      initialValues={{ title, isVertical, value, options }}
      disabled={disabled}
      form={form}
      onValuesChange={handleValuesChange}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please enter the title.' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Options">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {/*遍历所有选项(可删除)*/}
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    {/*输入框*/}
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: 'Please enter the option text.' },
                        {
                          validator: (_, text) => {
                            const { options = [] } = form.getFieldsValue()
                            let num = 0
                            options.forEach((option: OptionType) => {
                              if (option.text === text) {
                                num++ //记录相同的选项文字
                              }
                            })
                            if (num === 1) {
                              return Promise.resolve()
                            }
                            return Promise.reject('Option text cannot be repeated')
                          },
                        },
                      ]}
                    >
                      <Input placeholder="Enter the option text..." />
                    </Form.Item>
                    {/*删除按钮*/}
                    {index > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
                  </Space>
                )
              })}
              {/*添加选项*/}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add({ text: '', value: '' })}
                  icon={<PlusOutlined />}
                  block
                >
                  Add option
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label="Default option" name="value">
        <Select
          options={[
            { label: 'Unchecked', value: '' }, // 添加一个选项，其值为空字符串
            ...options.map(({ text, value }) => ({ label: text || '', value })),
          ]}
        ></Select>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>Vertical</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
