import { UUID } from 'types'
import { Url } from './constants'

export const getAccountTransactionsUrl = (pocketId: UUID) => {
  return `${Url.Accounts}/${pocketId}/transactions`
}

export const getAccountDetailsUrl = (pocketId: UUID) => {
  return `${Url.Accounts}/${pocketId}/details`
}
