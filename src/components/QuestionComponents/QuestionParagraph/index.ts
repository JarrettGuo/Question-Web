/*
 * 问卷-段落
 */

import Component from './Component'
import { QuestionParagraphDefaultProps } from './interface'
import PropComponent from './PropComponent'

//导出接口
export * from './interface'

// Paragraph组件的配置
export default {
  title: 'Paragraph',
  type: 'questionParagraph',
  Component,
  PropComponent,
  defaultProps: QuestionParagraphDefaultProps,
}
