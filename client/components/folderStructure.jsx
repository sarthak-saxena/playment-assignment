import React from 'react'
import _ from 'lodash'

import EditableInput from './shared/editableInput'
import { setLevel, changeFolderName, deleteFolder } from '../actions/folderActions'
import { message, Icon, Row, Col, Tooltip } from 'antd'

export default class FolderStructure extends React.Component {
  changeLevel = (folderKey) => {
    const { dispatch, folderStore } = this.props
    const { level, data } = folderStore
    let l = level.concat(',', folderKey)
    dispatch(setLevel(l))
  }

  changeFolderName = (oldName, newName) => {
    const { dispatch} = this.props
    dispatch(changeFolderName(oldName, newName))
  }

  deleteFolder = (key) => {
    const { dispatch } = this.props
    dispatch(deleteFolder(key))
  }

  render() {
    const { folderStore } = this.props
    const { data, level } = folderStore

    let folders = []
    let levels = level.split(',')
    let search = data['root']
    levels.shift()
    _.each(levels, (l) => {
      search = search[l]
    })

    _.each(search, (folder, key) => {
      let folderName = _.keys(folder)[0]
      folders.push(
        <div key={key} className="folder">
          <Row type="flex">
            <Col span={23}>
              <a onClick={() => this.changeLevel(key)}>
                <Icon type="folder" />{key}
              </a>
                <EditableInput
                  text={key}
                  edit={(value) => this.changeFolderName(key, value)}
                />
            </Col>
            <Col span={1}>
              <Tooltip placement="bottom" title="Delete Folder">
                <Icon type="delete" onClick={() => this.deleteFolder(key)}/>
              </Tooltip>
            </Col>
          </Row>
        </div>
      )
    })

    return (
     <div className="folder-structure">
       <div className="row">
         { folders }
       </div>
       {
        _.isEmpty(folders) ?
          <center className="tmargin100">
            No folders exist. Click create button to create folders
          </center> : ''
       }
     </div>
    )
  }
}
