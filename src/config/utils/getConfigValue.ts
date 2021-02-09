import { getEnvByOrigin } from '../../env'
import { CONFIG, DEFAULT_ENV, ConfigKey } from '../config'

export const getConfigValue = <T = string>(key: ConfigKey, config: object = CONFIG): T =>
  config[getEnvByOrigin()][key] ?? config[DEFAULT_ENV][key]
