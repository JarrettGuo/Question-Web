export type OptionType = {
  value: string
  text: string
}

//定义单选组件的props类型
export type QuestionRadioPropsType = {
  title?: string
  isVertical?: boolean
  options?: OptionType[]
  value?: string

  //事件
  onChange?: (newProps: QuestionRadioPropsType) => void
  disabled?: boolean
}

//单选组件的配置
export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
  title: 'Multiple choice heading',
  isVertical: false,
  options: [
    { value: 'item1', text: 'Option 1' },
    { value: 'item2', text: 'Option 2' },
  ],
  value: '',
}

//统计组件的数据类型
export type QuestionRadioStatPropsType = {
  stat: Array<{ name: string; count: number }>
}
