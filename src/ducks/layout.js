import { createActions, createReducer } from 'reduxsauce'
import { breakpoint } from 'common/styles'

/* Types */
export const { Types, Creators } = createActions({
  windowResize: ["width"]
})

/* Initial State */
const INITIAL_STATE = {
  windowWidth: window.innerWidth,
}

/* Selectors */
export const Selectors = {
  isMobile: (state => (
    state.layout.windowWidth < breakpoint
  )),

  isDesk: (state => (
    state.layout.windowWidth >= breakpoint
  ))
}

/* Action Creators */
const windowResize = (state, { windowWidth }) => ({
    ...state,
    windowWidth
})

/* Reducer */
export default createReducer(INITIAL_STATE, {
    [Types.WINDOW_RESIZE]: windowResize,
})