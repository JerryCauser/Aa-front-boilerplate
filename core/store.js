import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import promiseMiddleware from 'redux-promise-middleware'
import thunkMiddleware from 'redux-thunk'
import withRedux from 'next-redux-wrapper'
import reducer from 'core/reducer'

export const initStoreCreator = (initialState = {}) => {
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(
        thunkMiddleware,
        promiseMiddleware()
      )
    )
  )
  return store
}
export const reduxPage = (comp) => withRedux(initStoreCreator)(comp)
