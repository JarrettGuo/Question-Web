/*
 * 问卷单选题组件
 */
import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionRadioDefaultProps } from './interface'
import StatComponent from './StatComponent'

export * from './interface'

export default {
  title: 'Single Choice Question',
  type: 'questionRadio',
  Component,
  PropComponent,
  defaultProps: QuestionRadioDefaultProps,
  StatComponent,
}
