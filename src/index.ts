import {
  renderApp,
  setupAxios,
  setupI18n,
  setupSentry,
  setupErrorHandler,
} from './bootstrap'

setupSentry()
setupAxios()
setupErrorHandler()
setupI18n()

renderApp()
