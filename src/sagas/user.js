import { all, call, takeLatest, put } from 'redux-saga/effects'
import { http, createURL } from './common'

import { Types } from 'ducks/trash'
import TrashFactory from './dtos/factories/Trash.factory'
import TrashDto from './dtos/Trash.dto'

const GET_LIST_URL = createURL('trashes')
const CHANGE_NAME_URL = createURL('product')

const API_TRASHS = [{
  "id": 1,
  "name": "Organico Rizzo",
  "percentage": 60.8,
  "priority": "Baixa",
  "latitude": -23.709033,
  "longitude": -46.623376,
  "last_update": "2020-06-01 22:39:29"
}, {
  "id": 2,
  "name": "Organico Rizzo",
  "percentage": 27.4,
  "priority": "Baixa",
  "latitude": -23.7091,
  "longitude": -46.6231,
  "last_update": "2020-06-01 22:39:29"
}]

function* getList () {
  try {
    const data = API_TRASHS
    const list = data.map(trash => new TrashDto(TrashDto.fromApi(trash)))

    yield put({
      type: Types.GET_LIST_SUCCESS,
      list: TrashFactory.buildList(3)
    })
  } catch (err) {
    yield put({
      type: Types.GET_LIST_FAILED,
      error: 'Erro ao carregar lista'
    })
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