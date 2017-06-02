import React from 'react'
import HeaderLayout from './header'
import { connect } from 'react-redux'
import { Layout, Menu } from 'antd'
const { Header, Content } = Layout
import keydown from 'react-keydown'
import FolderStructure from './folderStructure'
import { formatLevels, setLevel } from '../actions/folderActions'

@keydown

@connect((store) => {
  return {
    dispatch: store.dispatch,
    folderStore: store.folderStore
  }
})

export default class Main extends React.Component {
  componentWillReceiveProps = (nextProps) => {
    const { keydown: { event } } = nextProps
    const { dispatch, folderStore } = this.props
    const { level } = folderStore
    if (event && (event.which === 8 || event.which === 37) &&
        level !== 'root') {
      let l = dispatch(formatLevels(level))
      dispatch(setLevel(l))
    }
  }

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
