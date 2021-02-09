import React, { ReactElement } from 'react'
import { AuthProvider, AuthContextInitialValue } from 'providers'

export const withAuthProvider = (initialValue?: AuthContextInitialValue) => (
  component: ReactElement,
) => <AuthProvider initialValue={initialValue}>{component}</AuthProvider>
