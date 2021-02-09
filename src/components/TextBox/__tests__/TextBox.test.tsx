import React from 'react'
import { render } from '@testing-library/react'

import { TextBox } from '../TextBox'

describe('TextBox', () => {
  it('should show description', () => {
    const DESCRIPTION = 'test description'
    const { getByText } = render(<TextBox>{DESCRIPTION}</TextBox>)

    expect(getByText(DESCRIPTION)).toBeInTheDocument()
  })
})
