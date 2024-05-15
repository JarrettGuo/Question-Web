/*
    问卷标题属性
*/

import Component from './Component'
import { QuestionTitleDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

//组件的配置
export default {
  title: 'Title',
  type: 'questionTitle', //和后端属性对应
  Component, //Canvas显示的组件
  PropComponent, //修改属性的组件
  defaultProps: QuestionTitleDefaultProps,
}
