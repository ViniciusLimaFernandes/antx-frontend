import { createActions, createReducer } from 'reduxsauce'

import TrashDto from 'sagas/dtos/Trash.dto'

/* Types */
export const { Types, Creators } = createActions({
  getListRequest: null,
  getListSuccess: ["list"],
  getListFailed: ["error"],

  addInMap: ["trash"],
  locateInMap: ["trash"],
  hideLocationInMap: ["trash"],
  confirmAddInMap: ["trash"],
  cancelAddInMap: ["trash"],

  changeTrashName: ["id", "name"],
  changeTrashNameSuccess: ["id", "name"],
  changeTrashNameFailed: ["error"],
})

/* Initial State */
const INITIAL_STATE = {
  list: [],
  addMode: false,
  listLoading: false,
  crudLoading: false,
  listError: null,
  crudError: null
}

/* Selectors */
export const Selectors = {
  list: (state => (
    state.trash.list
  )),

  isListLoading: (state => (
    state.trash.isListLoading
  )),

  isAddMode: (state => (
    state.trash.addMode
  )),

  crudLoading: (state => (
    state.trash.crudLoading
  )),

  listError: (state => (
    state.trash.listError
  )),

  crudError: (state => (
    state.trash.crudError
  ))
}

/* Action Creators */
const listRequest = (state => ({
  ...state,
  listLoading: true,
  listError: INITIAL_STATE.listError
}))

const listSuccess = (state, { list }) => ({
  ...state,
  list,
  listLoading: INITIAL_STATE.listLoading,
  listError: INITIAL_STATE.listError
})

const listFailed = (state, { error }) => ({
  ...state,
  listLoading: INITIAL_STATE.listLoading,
  listError: error
})

const addInMap = (state, { trash }) => {
  const newTrash = new TrashDto({ ...trash, coords: { x: 165, y: 15 }, draggable: true })
  return ({
    ...state,
    addMode: true,
    list: state.list.map(t => t.id === trash.id ? newTrash : t)
  })
}

const locate = (state, { trash }) => {
  return ({
    ...state,
    list: state.list.map(t => t.id === trash.id ? { ...trash, highlight: true } : t)
  })
}

const hideLocation = (state, { trash }) => {
  return ({
    ...state,
    list: state.list.map(t => t.id === trash.id ? { ...trash, highlight: false } : t)
  })
}

const confirmAddInMap = (state, { trash }) => {
  const newTrash = new TrashDto({ ...trash, draggable: false })
  return ({
    ...state,
    addMode: false,
    list: state.list.map(t => t.id === trash.id ? newTrash : t)
  })
}

const cancelAddInMap = (state, { trash }) => {
  const newTrash = new TrashDto({ ...trash, coords: {}, draggable: false })
  return ({
    ...state,
    addMode: false,
    list: state.list.map(t => t.id === trash.id ? newTrash : t)
  })
}

const changeTrashName = (state, { id, name }) => {
  const newTrash = new TrashDto({ ...state.list.find(t => t.id === id ), name })
  return ({
    ...state,
    list: state.list.map(t => t.id === id ? newTrash : t )
  })
}

/* Reducer */
export default createReducer(INITIAL_STATE, {
  [Types.GET_LIST_REQUEST]: listRequest,
  [Types.GET_LIST_SUCCESS]: listSuccess,
  [Types.GET_LIST_FAILED]: listFailed,

  [Types.ADD_IN_MAP]: addInMap,
  [Types.LOCATE_IN_MAP]: locate,
  [Types.HIDE_LOCATION_IN_MAP]: hideLocation,
  [Types.CONFIRM_ADD_IN_MAP]: confirmAddInMap,
  [Types.CANCEL_ADD_IN_MAP]: cancelAddInMap,

  // [Types.CHANGE_TRASH_NAME]: state => ({ state }),
  [Types.CHANGE_TRASH_NAME_SUCCESS]: changeTrashName,
  // [Types.CHANGE_TRASH_NAME]: state => ({ state }),
})
