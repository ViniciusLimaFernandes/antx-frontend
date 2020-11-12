import { combineReducers } from 'redux'
import { reducer as _form } from 'redux-form'

import _layout from './layout'
import trash from './trash'
import user from './user'

export default combineReducers({
    _form,
    _layout,
    trash,
    user
})