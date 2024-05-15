import React, { FC } from 'react'
import { Typography } from 'antd'
import { QuestionTitleDefaultProps, QuestionTitlePropsType } from './interface'

const { Title } = Typography

const QuestionTitle: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
  // 先从默认props中解构出text, level, isCenter 之后再从props中解构出来，这样props中的值会覆盖默认值
  const { text = '', level = 1, isCenter = false } = { ...QuestionTitleDefaultProps, ...props }

  // 根据标题级别生成不同的字体大小
  const genFontSize = (level: number) => {
    if (level === 1) {
      return '32px'
    }
    if (level === 2) {
      return '24px'
    }
    if (level === 3) {
      return '20px'
    }
    if (level === 4) {
      return '16px'
    }
    return '14px'
  }
  return (
    <div>
      <Title
        level={level}
        style={{
          textAlign: isCenter ? 'center' : 'start',
          marginBottom: '0',
          fontSize: genFontSize(level),
        }}
      >
        {text}
      </Title>
    </div>
  )
}

export default QuestionTitle
