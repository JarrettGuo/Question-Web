import React, { FC, useEffect, useState } from 'react'
import { Tabs } from 'antd'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import ComponentProp from './ComponentProp'
import PageSetting from './PageSetting'

enum TAB_KEYS {
  PROP = 'prop',
  SETTING = 'setting',
}

const RightPanel: FC = () => {
  //设置默认选中的tab 用于切换页面设置和属性设置
  const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP)
  //获取当前选中的组件id
  const { selectedId } = useGetComponentInfo()
  //当选中的组件id变化时，切换tab 切换到属性设置 如果没有选中的组件 切换到页面设置
  useEffect(() => {
    if (selectedId) {
      setActiveKey(TAB_KEYS.PROP)
    } else {
      setActiveKey(TAB_KEYS.SETTING)
    }
  }, [selectedId])
  const tabsItems = [
    {
      key: TAB_KEYS.PROP,
      label: (
        <span>
          <FileTextOutlined />
          Property
        </span>
      ),
      children: <ComponentProp />,
    },
    {
      key: TAB_KEYS.SETTING,
      label: (
        <span>
          <SettingOutlined />
          Page Setting
        </span>
      ),
      children: <PageSetting />,
    },
  ]
  //当没有选中的组件时，显示页面设置 当选中组件时，显示属性设置
  return <Tabs activeKey={activeKey} items={tabsItems} />
}

export default RightPanel
