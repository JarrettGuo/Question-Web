import React, { FC } from 'react'
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import ComponentLib from './ComponentLib'
import Layers from './Layers'

const LeftPanel: FC = () => {
  const tabsItems = [
    {
      key: 'componentLib',
      label: (
        <span>
          <AppstoreOutlined />
          Components Library
        </span>
      ),
      children: <ComponentLib />,
    },
    {
      key: 'layers',
      label: (
        <span>
          <BarsOutlined />
          Layers
        </span>
      ),
      children: <Layers />,
    },
  ]
  return <Tabs defaultActiveKey="componentLib" items={tabsItems} />
}
export default LeftPanel
