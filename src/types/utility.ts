export type Dictionary<T = string> = {
  [index: string]: T
}

export type FixedDictionary<T, U = string> = { [K in keyof T]: U }

export type SyntheticEventTarget = {
  value: any
  name?: string
}

export type SyntheticEvent = {
  target: SyntheticEventTarget
}

export type UUID = string
