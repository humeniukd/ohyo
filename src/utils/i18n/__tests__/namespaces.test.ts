import { getI18nNamespaces } from '../namespaces'

const translations = {
  pages: {
    SignIn: {
      header: {
        title: 'SignIn',
      },
    },
    SignUp: {
      MobileNumberScreen: {
        title: 'Mobile number',
        description: 'We may send a verification code to this number',
      },
    },
  },
  components: {
    CountryCodeSelect: {
      placeholder: 'Country',
    },
    PhoneNumberInput: {
      placeholder: 'Mobile number',
    },
  },
}

const expectedTranslations = {
  'pages.SignIn': {
    header: {
      title: 'SignIn',
    },
  },
  'pages.SignUp': {
    MobileNumberScreen: {
      title: 'Mobile number',
      description: 'We may send a verification code to this number',
    },
  },
  'components.CountryCodeSelect': {
    placeholder: 'Country',
  },
  'components.PhoneNumberInput': {
    placeholder: 'Mobile number',
  },
}

describe('getI18nNamespaces', () => {
  it('should group translations by namespaces', () => {
    expect(getI18nNamespaces(translations)).toEqual(expectedTranslations)
  })
})
