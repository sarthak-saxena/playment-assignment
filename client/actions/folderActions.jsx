export function createSubFolder() {
  return (dispatch, getState) => {
    dispatch({type: 'CREATE_SUB_FOLDER', payload: 'New Folder'})
  }
}

export function setLevel(level) {
  return (dispatch, getState) => {
    dispatch({type: 'SET_LEVEL', payload: level})
  }
}

export function formatLevels(level) {
  return (dispatch, getState) => {
    let l = _.clone(level)
    l = l.split(',')
    l.splice(l.length-1, 1)
    l = l.join(',')
    return l
  }
}

export function changeFolderName(oldName, newName) {
  return (dispatch, getState) => {
    let name = {
      old: oldName,
      new: newName
    }
    dispatch({type: 'CHANGE_FOLDER_NAME', payload: name})
  }
}

export function deleteFolder(key) {
  return (dispatch, getState) => {
    dispatch({type: 'DELETE_FOLDER', key})
  }
}
