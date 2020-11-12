import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { NOT_LOGGED_SCREENS, HOME } from './consts'

export default function Routes () {
  function createScreens(screens) {
    return screens.map(screen => (
      <Route exact path={screen.path} component={screen.Component} key={`route-to-${screen.path}`} />
    ))
  }

  return (
    <Switch>
      {createScreens(NOT_LOGGED_SCREENS)}
      <Redirect to={HOME} />
    </Switch>
  )
}