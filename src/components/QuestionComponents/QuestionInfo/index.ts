/*
 * 问卷信息组件
 */
import Component from './Component'
import { QuestionInfoDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

//组件的配置
export default {
  title: 'Questionnaire Information',
  type: 'questionInfo', //和后端属性对应
  Component, //Canvas显示的组件
  PropComponent, //修改属性的组件
  defaultProps: QuestionInfoDefaultProps,
}
