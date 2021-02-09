import React, { FC, useEffect } from 'react'
import { render, screen } from '@testing-library/react'
import { useMountedState } from '../useMountedState'

const TEST_ID = 'testId'

const ExampleComponent: FC<{ changeCallback: VoidFunction }> = ({ changeCallback }) => {
  const [value, setValue] = useMountedState(1)

  useEffect(() => {
    setTimeout(() => {
      setValue(() => {
        changeCallback()
        return 2
      })
    }, 100)
  }, [changeCallback, setValue])

  return <span data-testid={TEST_ID}>{value}</span>
}

jest.useFakeTimers()

describe('useMountedState hook', () => {
  describe('when component was unmounted', () => {
    it('should not update the state', async () => {
      const changeCallback = jest.fn()
      const { unmount } = render(<ExampleComponent changeCallback={changeCallback} />)

      expect(screen.getByTestId(TEST_ID)).toHaveTextContent('1')

      unmount()

      jest.runAllTimers()

      expect(changeCallback).not.toHaveBeenCalled()
    })
  })
})
