import React from 'react'
import { Router } from 'react-router'
import { createMemoryHistory } from 'history'

import { renderWithTheme } from 'utils/testing'
import { AuthProvider } from 'providers'
import { Redirect } from '../StartPageRedirect'

describe('StartPageRedirect', () => {
  describe('when env variable not dev', () => {
    it('should render redirect component', () => {
      const history = createMemoryHistory()

      renderWithTheme(
        <Router history={history}>
          <AuthProvider>
            <Redirect />
          </AuthProvider>
        </Router>,
      )

      expect(history.location.pathname).toBe('/start')
    })
  })
})
