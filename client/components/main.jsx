import React from 'react'
import HeaderLayout from './header'
import FolderStructure from './folderStructure'
import { connect } from 'react-redux'
import { Layout, Menu } from 'antd'
const { Header, Content } = Layout

@connect((store) => {
  return {
    dispatch: store.dispatch,
    folderStore: store.folderStore
  }
})
export default class Main extends React.Component {
  render() {
    const { dispatch, folderStore } = this.props
    return (
      <div className="folder-container">
        <Layout className="layout">
          <Header>
            <Menu
              theme="dark"
              mode="horizontal"
            >
              <Menu.Item key="1">Folder Directory</Menu.Item>
            </Menu>
          </Header>
          <Content>
            <div className="folder-layout">
              <HeaderLayout dispatch={dispatch} folderStore={folderStore}/>
              <FolderStructure dispatch={dispatch} folderStore={folderStore}/>
            </div>
          </Content>
        </Layout>
      </div>
    )
  }
}
