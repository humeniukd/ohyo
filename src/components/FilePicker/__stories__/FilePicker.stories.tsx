import React from 'react'

import { FilePicker } from '..'
import { actions } from '@storybook/addon-actions'

export default {
  title: 'FilePicker',
  component: FilePicker
}

const defaultEvents = actions('pick')

export const defaultView = () => <FilePicker {...defaultEvents}/>
