import { fireEvent } from '@testing-library/react'

export const fireChangeEvent = (element: HTMLElement, value: string | number) =>
  fireEvent.change(element, { target: { value } })
