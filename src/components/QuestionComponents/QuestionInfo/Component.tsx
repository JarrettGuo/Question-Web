import React, { FC } from 'react'
import { Typography } from 'antd'
import { QuestionInfoPropsType, QuestionInfoDefaultProps } from './interface'

const { Title, Paragraph } = Typography

const QuestionParagraph: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  const { title = '', desc = '' } = { ...QuestionInfoDefaultProps, ...props }
  const descList = desc.split('\n')
  return (
    <div style={{ textAlign: 'center' }}>
      <Title style={{ fontSize: '24px' }}>{title}</Title>
      <Paragraph>
        {descList.map((item, index) => (
          <span key={index}>
            {index > 0 && <br />}
            {item}
          </span>
        ))}
      </Paragraph>
    </div>
  )
}

export default QuestionParagraph
