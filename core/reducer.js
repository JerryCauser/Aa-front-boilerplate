import {combineReducers} from 'redux'

import github from 'components/Github/Github.duck'

export default combineReducers({
  blank: (state = {}) => state,
  github
})