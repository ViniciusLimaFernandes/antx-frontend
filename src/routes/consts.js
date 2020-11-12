import Home from 'screens/Home'
import Settings from 'screens/Settings'

function screenFactory (path, Component) {
  return {
    path, Component
  }
}

export const HOME = '/'
export const SETTINGS = '/configuracoes'
export const NOT_LOGGED_SCREENS = [
  screenFactory(HOME, Home),
  screenFactory(SETTINGS, Settings),
]

export function withParam (route, param) {
  const path = route.substring(0, route.indexOf(':'))
  return `${path}${param}`
}