import React, { FC, useState, ChangeEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useRequest, useKeyPress, useDebounceEffect } from 'ahooks'
import { Button, Typography, Space, Input, message } from 'antd'
import { EditOutlined, LeftOutlined, LoadingOutlined } from '@ant-design/icons'
import EditToolbar from './EditToolbar'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { changePageTitle } from '../../../store/pageInfoReducer'
import { updateQuestionService } from '../../../services/question'
import styles from './EditHeader.module.scss'

const { Title } = Typography

//标题组件
const TitleElement: FC = () => {
  const dispatch = useDispatch()
  const { title } = useGetPageInfo()
  const [editState, setEditState] = useState(false)
  //修改标题 输入框值变化时，修改标题
  function handleChangeTitle(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = (event.target as HTMLInputElement)?.value.trim()
    if (!newTitle) return
    dispatch(changePageTitle(newTitle))
  }
  //修改标题 当点击标题时，设置为编辑状态
  if (editState) {
    return (
      <Input
        value={title}
        onChange={handleChangeTitle}
        onPressEnter={() => setEditState(false)}
        onBlur={() => setEditState(false)}
      />
    )
  }
  return (
    <Space>
      <Title>{title}</Title>
      <Button icon={<EditOutlined />} type="text" onClick={() => setEditState(true)} />
    </Space>
  )
}

//保存按钮
const SaveButton: FC = () => {
  //获取当前页面的id
  const { id } = useParams()
  //获取组件信息
  const { componentList = [] } = useGetComponentInfo()
  //获取页面信息
  const pageInfo = useGetPageInfo()
  //保存请求
  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(id, { ...pageInfo, componentList })
    },
    { manual: true }
  )

  //快捷键
  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    //阻止默认事件
    event.preventDefault()
    //当loading为false时，保存
    if (!loading) save()
  })

  //自动保存 具有防抖功能（不是定期保存）
  useDebounceEffect(
    //当componentList变化时，保存
    () => {
      if (!id) return
      save()
    },
    //监听的值
    [componentList, pageInfo],
    //防抖时间为1秒
    { wait: 1000 }
  )
  return (
    <Button onClick={save} disabled={loading} icon={loading ? <LoadingOutlined /> : null}>
      Save
    </Button>
  )
}
//发布按钮
const PublishButton: FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { componentList = [] } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()
  const { loading, run: publish } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(id, {
        ...pageInfo,
        componentList,
        isPublished: true, //标志问卷被发布 和save不同的是，这里多了一个isPublished字段
      })
    },
    {
      manual: true,
      onSuccess() {
        message.success('Published successfully')
        navigate(`/question/stat/${id}`) //发布成功后跳转到问卷统计页面
      },
    }
  )
  return (
    <Button type="primary" onClick={publish} disabled={loading}>
      Publish
    </Button>
  )
}
//编辑页面的头部
const EditHeader: FC = () => {
  const navigate = useNavigate()
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => navigate(-1)}>
              Back
            </Button>
            <TitleElement />
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
