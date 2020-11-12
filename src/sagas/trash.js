import { all, call, takeLatest, put } from 'redux-saga/effects'
import { http, createURL } from './common'

import { Types } from 'ducks/trash'
import TrashDto from './dtos/Trash.dto'

const GET_LIST_URL = createURL('trashes')
const CHANGE_NAME_URL = createURL('product')

function* getList () {
  try {
    const req = yield call(http.get, GET_LIST_URL)    
    const list = req.data.trashes.map(trash => new TrashDto(TrashDto.fromApi(trash)))

    yield put({
      type: Types.GET_LIST_SUCCESS,
      list
    })
  } catch (err) {
    yield put({ type: Types.GET_LIST_REQUEST })
  }
}

function* changeTrashName ({ id, name }) {
  try {
    yield call(http.post, CHANGE_NAME_URL, { id, name })
    yield put ({
      type: Types.CHANGE_TRASH_NAME_SUCCESS,
      id, name
    })
  } catch (err) {
    yield put({
      type: Types.CHANGE_TRASH_NAME_FAILED,
      error: 'Erro ao tentar trocar nome na API'
    })
  }
}

export default function* () {
  yield all([
    takeLatest(Types.GET_LIST_REQUEST, getList),
    takeLatest(Types.CHANGE_TRASH_NAME, changeTrashName)
  ])
}