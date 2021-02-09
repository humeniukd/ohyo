import { ReactElement } from 'react'
import { render, RenderResult } from '@testing-library/react'

import { withTheme } from './withTheme'

export const renderWithTheme = (component: ReactElement): RenderResult =>
  render(withTheme(component))
