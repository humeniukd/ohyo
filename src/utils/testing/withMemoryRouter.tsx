import React, { ReactElement } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { renderWithTheme } from 'utils/testing'
import { flow } from 'lodash'

export const withMemoryRouter = (component: ReactElement) => (
  <MemoryRouter>{component}</MemoryRouter>
)

export const renderWithThemeAndMemoryRouter = flow([withMemoryRouter, renderWithTheme])
