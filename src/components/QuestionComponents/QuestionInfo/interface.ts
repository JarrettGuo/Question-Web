//定义QuestionInfo组件的props类型
export type QuestionInfoPropsType = {
  title?: string
  desc?: string

  onChange?: (newProps: QuestionInfoPropsType) => void
  disabled?: boolean
}

export const QuestionInfoDefaultProps: QuestionInfoPropsType = {
  title: 'Questionnaire Title',
  desc: 'Questionnaire Description',
}
