import { createActions, createReducer } from 'reduxsauce'

import MapCoordsDto from 'sagas/dtos/MapCoords.dto'

/* Types */
export const { Types, Creators } = createActions({
  setUserCoords: ["coords"]
})

/* Initial State */
const INITIAL_STATE = {
  coords: []
}

/* Selectors */
export const Selectors = {
  coords: (state => (
    state.user.coords
  ))
}

/* Action Creators */
const setUserCoords = ((state, { coords }) => ({
  ...state,
  coords: new MapCoordsDto(coords)
  // coords: new MapCoordsDto({ x: -23.669919, y: -46.701335 })
}))

/* Reducer */
export default createReducer(INITIAL_STATE, {
  [Types.SET_USER_COORDS]: setUserCoords
})
