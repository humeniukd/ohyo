import React from 'react'

import { spaceBoxWrapper } from 'utils'
import { TextBox } from '../TextBox'

export default {
  title: 'TextBox',
  component: TextBox,
  decorators: [spaceBoxWrapper],
}

export const defaultView = () => <TextBox>test text</TextBox>
