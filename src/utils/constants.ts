import mapValues from 'lodash/mapValues'
import { ConfigKey, getConfigValue } from 'config'
import { Country, Dictionary } from 'types'

export const COUNTRIES = getConfigValue<Dictionary<Country>>(ConfigKey.Countries)

export enum Url {
  Home = '/',
  Error = '/error',

  // Auth
  Start = '/start',

  // Account
  Accounts = '/accounts',
  AccountsTransactions = '/accounts/transactions',
  Account = '/accounts/:id',
  AccountTransactions = '/accounts/:id/transactions',
  AccountDetails = '/accounts/:id/details',

  Callback = '/callback',
  LoggedOut = '/logged-out',

  // Cards
  Cards = '/cards',
  CardsOverview = '/cards/overview',
  CardSettings = '/cards/:id',

  Upload = '/upload',

  // Other
  Help = '/help',
}

export const AUTH_URLS = [Url.Upload]

export enum QueryKey {
  Config = 'Config',
  User = 'User',
  Upload = 'Upload',
  Tags = 'Tags',
  Transcoding = 'Transcoding',
}

export enum HttpHeader {
  ApiAuthorization = 'Authorization',
  ApiKey = 'X-Api-key',
}

export enum HttpCode {
  Unauthorized = 401,
  NotFound = 401,
  InternalServerError = 500,
}

export enum ReactQueryStatus {
  Idle = 'idle',
  Loading = 'loading',
  Error = 'error',
  Success = 'success',
}

export enum AppErrorCode {
  SignInUnknownScreen = 'SignInUnknownScreen',
}

export enum KeyboardKey {
  ArrowDown = 'ArrowDown',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
  ArrowUp = 'ArrowUp',
  Backspace = 'Backspace',
  Enter = 'Enter',
  Esc = 'Escape',
}

export const CountryCode = mapValues(COUNTRIES, 'id')
