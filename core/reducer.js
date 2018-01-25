import {combineReducers} from 'redux'

import github from 'pages/github/Github.duck'

export default combineReducers({
  blank: (state = {}) => state,
  github
})