import { ReactElement } from 'react'
import flow from 'lodash/flow'
import { render } from '@testing-library/react'

type Wrapper = (content: ReactElement) => ReactElement

export const renderWith = (...wrappers: Wrapper[]) => (content: ReactElement) =>
  render(flow(wrappers)(content))
