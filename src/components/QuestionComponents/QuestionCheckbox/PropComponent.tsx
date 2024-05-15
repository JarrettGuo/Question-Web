import React, { FC, useEffect } from 'react'
import { Form, Input, Checkbox, Button, Space } from 'antd'
import { nanoid } from 'nanoid'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { QuestionCheckboxPropsType, OptionType } from './interface'

const PropComponent: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const { title, list = [], isVertical, disabled, onChange } = props
  const [form] = Form.useForm()
  function handleValuesChange() {
    //判断onChange是否存在
    if (onChange == null) return
    const newValues = form.getFieldsValue() as QuestionCheckboxPropsType
    //过滤掉list中text为null的选项
    if (newValues.list) {
      newValues.list = newValues.list.filter(option => !(option.text == null))
    }
    //提取newValues中的list
    const { list = [] } = newValues
    //遍历所有选项，如果选项没有value值，就生成一个
    list.forEach(option => {
      //当option有value值时，不生成新的value值
      if (option.value) return
      //如果选项没有value值，就生成一个
      option.value = nanoid(5)
    })
    // 触发onChange事件
    onChange(newValues)
  }
  useEffect(() => {
    form.setFieldsValue({ title, list, isVertical })
  }, [title, list, isVertical])
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, list, isVertical }}
      disabled={disabled}
      onValuesChange={handleValuesChange}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please enter a title...' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Options">
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {/*遍历所有选项(可删除)*/}
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    {/*当前选项 是否选中*/}
                    <Form.Item name={[name, 'checked']} valuePropName="checked">
                      <Checkbox />
                    </Form.Item>
                    {/*输入框*/}
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: 'Please enter option text.' },
                        {
                          validator: (_, text) => {
                            const { list = [] } = form.getFieldsValue()
                            let num = 0
                            list.forEach((option: OptionType) => {
                              if (option.text === text) {
                                num++ //记录相同的选项文字
                              }
                            })
                            if (num === 1) {
                              return Promise.resolve()
                            }
                            return Promise.reject('Option Text Repeat')
                          },
                        },
                      ]}
                    >
                      <Input placeholder="Option text" />
                    </Form.Item>
                    {/*删除按钮*/}
                    {index > 0 && <MinusCircleOutlined onClick={() => remove(name)} />}
                  </Space>
                )
              })}
              {/*添加选项*/}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add({ text: '', value: '', checked: false })}
                  icon={<PlusOutlined />}
                  block
                >
                  Add Option
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>Vertical</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
