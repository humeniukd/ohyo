import values from 'lodash/values'
import pick from 'lodash/pick'
import { COUNTRIES } from './constants'

type SupportedCountryOption = {
  label: string
  value: string
}

export const getFormattedSupportedCountries = (supportedCountries?: string[]) =>
  supportedCountries
    ? values(pick(COUNTRIES, supportedCountries)).map<SupportedCountryOption>((item) => ({
        label: item.name,
        value: item.id,
      }))
    : []

export const getCountryCodeByCountryCallingCode = (callingCode: string) =>
  values(COUNTRIES).find((country) => country.countryCallingCodes[0] === callingCode)

export const getPhoneCodeByCountryCode = (countryCode: string) =>
  COUNTRIES[countryCode]?.countryCallingCodes[0]

