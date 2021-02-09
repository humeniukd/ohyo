import React, {FC, useContext} from 'react'
import {Redirect as ReactRedirect, useRouteMatch} from 'react-router'

import { AxiosSecurity, Url } from 'utils'
import { AuthContext } from 'providers'

type Props = {
  where?: Url
}

export const EXCLUDED_ROUTES = [
    Url.Error,
    Url.LoggedOut,
]

export const Redirect: FC<Props> = ({ where = Url.Accounts }) => {
  const { securityCode, isAuthorized } = useContext(AuthContext)
    const matchExcludedRoute = useRouteMatch(EXCLUDED_ROUTES)

    const hasAuth = isAuthorized || AxiosSecurity.hasAuth()
    const shouldRedirect = !matchExcludedRoute && !securityCode

  return shouldRedirect ? (
    <ReactRedirect
      to={{
        pathname: hasAuth ? where : Url.Start,
      }}
    />
  ) : null
}
