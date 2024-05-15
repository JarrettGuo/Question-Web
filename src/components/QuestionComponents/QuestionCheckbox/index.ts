/*
 * 问卷多选题组件
 */

import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionCheckboxDefaultProps } from './interface'
import StatComponent from './StatComponent'

export * from './interface'

export default {
  title: 'Multiple Choice Question',
  type: 'questionCheckbox',
  Component,
  PropComponent,
  defaultProps: QuestionCheckboxDefaultProps,
  StatComponent,
}
