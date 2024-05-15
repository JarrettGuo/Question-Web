import React, { FC, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import moment from 'moment'
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from 'antd'
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { updateQuestionService, duplicateQuestionService } from '../services/question'
import { getQuestionStatListService } from '../services/stat'
import styles from './QuestionCard.module.scss'

type QuestionCardProps = {
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createdAt: string
}

const { confirm } = Modal

const QuestionCard: FC<QuestionCardProps> = props => {
  const navigate = useNavigate()

  const [count, setCount] = useState(0)

  //删除问卷
  const [isDeleteState, setIsDeleteState] = useState(false)
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => {
      await updateQuestionService(props._id, { isDeleted: true })
    },
    {
      manual: true,
      onSuccess() {
        message.success('Deleted successfully')
        setIsDeleteState(true)
      },
    }
  )

  function del() {
    confirm({
      title: 'Are you sure you want to delete this questionnaire?',
      icon: <ExclamationCircleFilled />,
      onOk() {
        deleteQuestion()
      },
    })
  }
  //已经删除的问卷不显示
  if (isDeleteState) return null

  const { _id, title, isPublished, createdAt, isStar } = props

  //修改标星
  const [isStarState, setIsStarState] = useState(isStar)
  const { loading: changeStarState, run: changeStar } = useRequest(
    async () => {
      await updateQuestionService(_id, { isStar: !isStarState })
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState) //更新state
        message.success('Update successfully')
      },
    }
  )
  //复制问卷
  const { loading: duplicateLoading, run: duplicate } = useRequest(
    async () => {
      const data = await duplicateQuestionService(_id)
      return data
    },
    {
      manual: true,
      onSuccess(result: any) {
        message.success('Copy successfully')
        navigate(`/question/edit/${result.id || result._id}`) //跳转到编辑页面
      },
    }
  )
  //统计答卷数量
  const { loading: countLoading } = useRequest(
    async () => {
      const data = await getQuestionStatListService(_id, { page: 1, pageSize: 10 })
      return data
    },
    {
      onSuccess(result) {
        // console.log(result)
        const { count = 0 } = result
        // console.log(count)
        setCount(count)
      },
    }
  )

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {isStarState && <StarOutlined style={{ color: 'red' }}></StarOutlined>}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? <Tag color="processing">Published</Tag> : <Tag>Unplished</Tag>}
            <span>Answer Number:{!countLoading && count}</span>
            <span>{moment(createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: '12px' }} />
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button
              icon={<EditOutlined />}
              type="text"
              size="small"
              onClick={() => navigate(`/question/edit/${_id}`)}
            >
              Edit
            </Button>
            <Button
              icon={<LineChartOutlined />}
              type="text"
              size="small"
              onClick={() => navigate(`/question/stat/${_id}`)}
              //当问卷未发布时，禁用数据统计按钮
              disabled={!isPublished}
            >
              Statistics
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button
              type="text"
              size="small"
              icon={<StarOutlined />}
              onClick={changeStar}
              disabled={changeStarState}
            >
              {isStarState ? 'Cancel star' : 'Star'}
            </Button>
            <Popconfirm
              title="Are you sure you want to copy this questionnaire?"
              onConfirm={duplicate}
              okText="Copy"
              cancelText="Cancel"
            >
              <Button type="text" size="small" icon={<CopyOutlined />} disabled={duplicateLoading}>
                Copy
              </Button>
            </Popconfirm>
            <Button
              type="text"
              size="small"
              icon={<DeleteOutlined />}
              onClick={del}
              disabled={deleteLoading}
            >
              Delete
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
