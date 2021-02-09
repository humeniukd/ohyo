export type AuthContextType = {
  securityCode: string
  setSecurityCode: (value: string) => void

  isAuthorized: boolean
  setAuthorized: (value: boolean) => void
}

export type AuthContextInitialValue = Partial<
  Pick<AuthContextType, 'securityCode'>
>
