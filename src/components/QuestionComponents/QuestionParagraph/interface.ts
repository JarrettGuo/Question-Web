// 作用: 定义QuestionParagraph组件的props类型
export type QuestionParagraphPropsType = {
  text?: string
  isCenter?: boolean

  //修改新的props
  onChange?: (newProps: QuestionParagraphPropsType) => void
  disabled?: boolean
}
//作用: 定义QuestionParagraph组件的默认props
export const QuestionParagraphDefaultProps: QuestionParagraphPropsType = {
  text: 'Paragraph text here',
  isCenter: false,
}
