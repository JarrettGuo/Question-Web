// 定义textarea组件的props类型
export type QuestionTextareaPropsType = {
  title?: string
  placeholder?: string

  // 用于双向绑定的回调函数 用于修改组件的props
  onChange?: (newProps: QuestionTextareaPropsType) => void
  disabled?: boolean
}

//定义textarea组件的默认props
export const QuestionTextareaDefaultProps: QuestionTextareaPropsType = {
  title: 'Multiple Line Input Box',
  placeholder: 'Please enter text here',
}
