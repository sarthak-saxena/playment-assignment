import React from 'react'
import Button from 'antd/lib/button'
import { createSubFolder, setLevel, formatLevels } from '../actions/folderActions'
import { Breadcrumb, Row, Col } from 'antd'

export default class HeaderLayout extends React.Component {
  createFolder = () => {
    this.props.dispatch(createSubFolder())
  }

  setLevel = () => {
    const { dispatch, folderStore } = this.props
    const { level } = folderStore
    let l = dispatch(formatLevels(level))
    dispatch(setLevel(l))
  }

  render() {
    const { level } = this.props.folderStore

    let breadcrumbs = (
      <Breadcrumb>
        {
          level.split(',').map((l, index) => {
            return <Breadcrumb.Item key={index}>{l}</Breadcrumb.Item>
          })
        }
      </Breadcrumb>
    )

    return (
      <div className="header">
        <Row type="flex">
          <Col span={1}>
            <Button
              onClick={this.setLevel}
              disabled={true ? this.props.folderStore.level === 'root' : false}
              shape="circle"
              icon="arrow-left"
            />
          </Col>
          <Col span={20}>
            {breadcrumbs}
          </Col>
          <Col span={3}>
            <Button onClick={this.createFolder}>Create Folder</Button>
          </Col>
        </Row>
      </div>
    )
  }
}
