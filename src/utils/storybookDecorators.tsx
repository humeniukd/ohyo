import React, { ReactElement } from 'react'
import Box from '@material-ui/core/Box'
import { StoryFn } from '@storybook/addons'

export const spaceBoxWrapper = (storyFn: StoryFn<ReactElement>) => (
  <Box ml="px16" mt="px16" mr="px16">
    {storyFn()}
  </Box>
)
