import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useTitle } from 'ahooks'
import { changeSelectedId } from '../../../store/componentsReducer'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import EditCanvas from './EditCanvas'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import EditHeader from './EditHeader'
import styles from './index.module.scss'

const Edit: FC = () => {
  const { loading } = useLoadQuestionData()
  const { title } = useGetPageInfo()
  useTitle(`Question Edit - ${title}`)
  const dispatch = useDispatch()
  //清空选中的id
  function clearSelectedId() {
    dispatch(changeSelectedId(''))
  }
  return (
    <div className={styles.container}>
      <div style={{ backgroundColor: '#fff', height: '40px' }}>
        <EditHeader />
      </div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles['canvas-wrapper']}>
              <div style={{ height: '900px' }}>
                <EditCanvas loading={loading} />
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit
