import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography, Spin } from 'antd'
import { useRequest } from 'ahooks'
import { MANAGE_INDEX_PATHNAME } from '../router'
import { getQuestionAndAnswerStatService } from '../services/stat'
import styles from './Home.module.scss'

// const BASE_URL: string = import.meta.env.VITE_BASE_URL
const { Title, Paragraph } = Typography

const Home: FC = () => {
  const navigate = useNavigate()
  const [questionCount, setQuestionCount] = useState(0)
  const [publishCount, setPublishCount] = useState(0)
  const [answerCount, setAnswerCount] = useState(0)
  const { loading } = useRequest(
    async () => {
      const res = await getQuestionAndAnswerStatService()
      return res // Add this line to return the response
    },
    {
      onSuccess(res) {
        const { questionCount = 0, publishCount = 0, answerCount = 0 } = res
        setQuestionCount(questionCount)
        setPublishCount(publishCount)
        setAnswerCount(answerCount)
      },
    }
  )

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        {loading && <Spin />}
        {!loading && (
          <>
            <Title>Questionnaire ｜ Online Voting</Title>
            <Paragraph>
              A total of {questionCount} questionnaires have been created, {publishCount}{' '}
              questionnaires have been published, and {answerCount} responses have been received.
            </Paragraph>
            <div>
              <Button type="primary" onClick={() => navigate(MANAGE_INDEX_PATHNAME)}>
                Manage Questionnaires
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Home
