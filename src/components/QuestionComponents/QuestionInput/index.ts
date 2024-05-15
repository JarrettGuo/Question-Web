/*
    问卷输入框属性
*/

import Component from './Component'
import { QuestionInputDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

//组件的配置
export default {
  title: 'Input Box',
  type: 'questionInput', //和后端属性对应
  Component, //Canvas显示的组件
  PropComponent, //修改属性的组件
  defaultProps: QuestionInputDefaultProps,
}
