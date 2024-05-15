// 定义input组件的props类型
export type QuestionInputPropsType = {
  title?: string
  placeholder?: string

  // 用于双向绑定的回调函数 用于修改组件的props
  onChange?: (newProps: QuestionInputPropsType) => void
  disabled?: boolean
}

//定义input组件的默认props
export const QuestionInputDefaultProps: QuestionInputPropsType = {
  title: 'Input Box',
  placeholder: 'Please enter text here',
}
