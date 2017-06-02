import { compose, createStore, applyMiddleware, combineReducers } from 'redux'
import createLogger from 'redux-logger'

import thunkMiddleware from 'redux-thunk'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import reducers from '../reducers'
import { initialStates } from '../reducers';

export default props => {
  const { folderInitialState } = initialStates
  // Redux expects to initialize the store using an Object, not an Immutable.Map
  const initialState = {
    folderStore: folderInitialState,

  };

  const reducer = combineReducers({
    ...reducers,
    router: routerReducer
  })
  const middleware = routerMiddleware(history)
  const composedStore = compose(
    applyMiddleware(thunkMiddleware, middleware)
  )
  const storeCreator = composedStore(createStore)
  const store = storeCreator(reducer, initialState)

  return store
}
