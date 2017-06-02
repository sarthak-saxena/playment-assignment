import * as types from '../constants/actionTypes'
import _ from 'lodash'
import message from 'antd/lib/message'

export const initialState = {
  data: {
    'root': {}
  },
  level: 'root'
}

export default function folderReducer(state = initialState, action) {
  let levels = state.level.split(',')
  let folders = _.clone(state.data)
  let search = folders['root']
  levels.shift()
  _.each(levels, (l) => {
    search = search[l]
  })

  switch (action.type) {
    case types.CREATE_SUB_FOLDER:
      let folderName = action.payload + ' ' + _.keys(search).length
      _.merge(search, {
        [folderName]: {
          // id: Math.floor(Date.now() / 1000)
        }
      })
      return {...state, data : folders}
    case types.SET_LEVEL:
      return {...state, level : action.payload}
    case types.CHANGE_FOLDER_NAME:
      let name = action.payload
      if(!_.includes(_.keys(search), name.new)) {
        search[name.new]  = search[name.old]
        delete search[name.old]
      } else {
        message.warning('Folder with same name already exists')
      }
      return {...state, data : folders}
    case types.DELETE_FOLDER:
      delete search[action.key]
      return {...state, data: folders}
    default:
      return state
  }
}
