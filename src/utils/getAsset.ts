import { ConfigKey, getConfigValue } from 'config'

export const getAsset = (name: string) => {
  return `${getConfigValue(ConfigKey.CdnUrl)}/${name}`
}
