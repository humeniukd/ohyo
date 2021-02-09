import React from 'react'
import { Router } from 'react-router'
import { createMemoryHistory } from 'history'

import { renderWithTheme } from 'utils/testing'
import { AuthProvider } from 'providers'
import { StartPageRedirect, EXCLUDED_ROUTES } from '../StartPageRedirect'

describe('StartPageRedirect', () => {
  describe('when env variable not dev', () => {
    it('should render redirect component', () => {
      // given
      const history = createMemoryHistory()

      renderWithTheme(
        <Router history={history}>
          <AuthProvider>
            <StartPageRedirect />
          </AuthProvider>
        </Router>,
      )

      // then
      expect(history.location.pathname).toBe('/start')
    })

    it.each(EXCLUDED_ROUTES)('should not redirect from "%s" route', (route) => {
      // given
      const history = createMemoryHistory()

      history.push(route)

      renderWithTheme(
        <Router history={history}>
          <AuthProvider>
            <StartPageRedirect />
          </AuthProvider>
        </Router>,
      )

      expect(history.location.pathname).toBe(route)
    })
  })
})
