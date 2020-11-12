import { all, fork } from 'redux-saga/effects'

import trash from './trash'
// import user from './user'

export default function* root() {
    yield all([
        fork(trash),
        // fork(user)
    ])
}