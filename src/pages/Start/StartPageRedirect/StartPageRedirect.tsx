import React, { useContext } from 'react'
import { Redirect, useRouteMatch } from 'react-router'

import { Url } from 'utils'
import { AuthContext } from 'providers'

export const EXCLUDED_ROUTES = [Url.Callback, Url.LoggedOut]

export const StartPageRedirect = () => {
  const { securityCode } = useContext(AuthContext)
  const matchExcludedRoute = useRouteMatch(EXCLUDED_ROUTES)

  const shouldRedirect = !securityCode && !matchExcludedRoute

  return shouldRedirect ? <Redirect to={Url.Start} /> : null
}
