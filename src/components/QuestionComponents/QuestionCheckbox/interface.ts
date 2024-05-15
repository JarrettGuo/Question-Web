export type OptionType = {
  value: string
  text: string
  checked: boolean
}
export type QuestionCheckboxPropsType = {
  title?: string
  isVertical?: boolean
  list?: OptionType[]

  //事件
  onChange?: (newProps: QuestionCheckboxPropsType) => void
  disabled?: boolean
}

export const QuestionCheckboxDefaultProps: QuestionCheckboxPropsType = {
  title: 'Multiple choice heading',
  isVertical: false,
  list: [
    { value: 'item1', text: 'Option 1', checked: false },
    { value: 'item2', text: 'Option 2', checked: false },
  ],
}

//统计组件的数据类型
export type QuestionCheckboxStatPropsType = {
  stat: Array<{ name: string; count: number }>
}
