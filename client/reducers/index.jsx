import { combineReducers } from 'redux'

import folderReducer, { initialState as folderInitialState } from './folderReducer'

export default {
  folderStore: folderReducer
}

export const initialStates = {
  folderInitialState
}
