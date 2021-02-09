import React, { FC, useState } from 'react'

import { AuthContextType, AuthContextInitialValue } from './types'
import { AxiosSecurity } from 'utils/security'

const EMPTY_DATA = {} as AuthContextType
const DEFAULT_DATA = {
  securityCode: '',
  isAuthorized: false,
} as AuthContextType

export const AuthContext = React.createContext<AuthContextType>(EMPTY_DATA)

export type AuthProviderProps = {
  initialValue?: AuthContextInitialValue
}

export const AuthProvider: FC<AuthProviderProps> = ({ initialValue, children }) => {

  const [securityCode, setSecurityCode] = useState<string>(
    initialValue?.securityCode ?? DEFAULT_DATA.securityCode,
  )

  const [isAuthorized, setAuthorized] = useState<boolean>(AxiosSecurity.hasAuth())

  const value: AuthContextType = {
    securityCode,
    setSecurityCode,

    isAuthorized,
    setAuthorized,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
