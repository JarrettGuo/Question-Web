//定义QuestionTitle组件的props类型
export type QuestionTitlePropsType = {
  text?: string
  level?: 1 | 2 | 3 | 4 | 5
  isCenter?: boolean

  // 用于双向绑定的回调函数 用于修改组件的props
  onChange?: (newProps: QuestionTitlePropsType) => void
  disabled?: boolean
}
//定义QuestionTitle组件的默认props
export const QuestionTitleDefaultProps: QuestionTitlePropsType = {
  text: 'Title',
  level: 1,
  isCenter: false,
}
