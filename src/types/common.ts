export type Country = Readonly<{
  name: string
  native: string
  continent: string
  capital: string
  languages: ReadonlyArray<string>
  id: string
  currencies: ReadonlyArray<string>
  countryCallingCodes: ReadonlyArray<string>
}>

export type Locale = {
  locale: string
  countryId: string
  nativeName: string
}

export type SelectOption = Readonly<{
  label: string
  value: string
}>


export type PresignedPostData = Readonly<{
  url: string
  key: string
  fields: Record<string, string>
}>

export type Tag = {
  text: string
}
