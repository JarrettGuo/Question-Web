import React, { FC } from 'react'
import { Typography } from 'antd'
import { QuestionParagraphDefaultProps, QuestionParagraphPropsType } from './interface'

const { Paragraph } = Typography
const QuestionParagraph: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text = '', isCenter = false } = { ...QuestionParagraphDefaultProps, ...props }
  //将文本内容按照换行符分割
  const textList = text.split('\n')
  return (
    <Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: '0' }}>
      {textList.map((item, index) => (
        <span key={index}>
          {index > 0 && <br />}
          {item}
        </span>
      ))}
    </Paragraph>
  )
}

export default QuestionParagraph
