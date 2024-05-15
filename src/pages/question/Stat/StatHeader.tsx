import React, { FC, useRef, useMemo } from 'react'
import { Space, Button, Typography, Input, Tooltip, message, Popover } from 'antd'
import { LeftOutlined, CopyOutlined, QrcodeOutlined } from '@ant-design/icons'
import type { InputRef } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import QRCode from 'qrcode.react'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import styles from './StatHeader.module.scss'

const { Title } = Typography
const StatHeader: FC = () => {
  const { title, isPublished } = useGetPageInfo()
  const navigate = useNavigate()
  const { id } = useParams()

  // 创建一个ref对象 用于获取input元素
  const urlInputRef = useRef<InputRef>(null)
  // 复制链接
  function copyLink() {
    // 获取input元素
    const elem = urlInputRef.current
    // 如果元素不存在，直接返回
    if (elem == null) return
    // 选中input内容
    elem.select()
    // 拷贝选中内容
    document.execCommand('copy')
    message.success('Copied successfully')
  }

  // 生成问卷链接和二维码
  const LinkAndQRCodeElement = useMemo(() => {
    if (!isPublished) return null
    const url = `http://localhost:3000/questionnaire/${id}`
    const QRCodeElement = (
      <div style={{ textAlign: 'center' }}>
        <QRCode value={url} size={150}></QRCode>
      </div>
    )
    return (
      <Space>
        <Input value={url} style={{ width: '300px' }} ref={urlInputRef}></Input>
        <Tooltip title="Copy">
          <Button icon={<CopyOutlined />} onClick={copyLink}></Button>
        </Tooltip>
        <Popover content={QRCodeElement}>
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    )
  }, [id, isPublished])
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => navigate(-1)}>
              Back
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{LinkAndQRCodeElement}</div>
        <div className={styles.right}>
          <Button type="primary" onClick={() => navigate(`/question/edit/${id}`)}>
            Edit
          </Button>
        </div>
      </div>
    </div>
  )
}
export default StatHeader
