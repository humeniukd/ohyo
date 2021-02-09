import { renderHook, act } from '@testing-library/react-hooks'

import { useModal } from '../useModal'

describe('useModal', () => {
  describe('when no actions are performed', () => {
    it('should not show modal window', () => {
      // given
      const { result } = renderHook(() => useModal())
      const modalProps = result.current[1]

      // then
      expect(modalProps.isOpen).toBe(false)
    })
  })

  describe('when show and hide actions are triggered', () => {
    it('should show and hide modal window', () => {
      // given
      const { result } = renderHook(() => useModal())
      const [showModal] = result.current

      // when
      act(() => {
        showModal()
      })

      const [afterShowActionShowModal, afterShowActionModalProps] = result.current

      act(() => {
        afterShowActionModalProps.onRequestClose()
      })

      const [afterHideActionShowModal, afterHideActionModalProps] = result.current

      // then
      expect(afterShowActionModalProps).toEqual({
        isOpen: true,
        onRequestClose: expect.any(Function),
      })

      expect(afterHideActionModalProps).toEqual({
        isOpen: false,
        onRequestClose: expect.any(Function),
      })

      expect(afterShowActionShowModal).toEqual(afterHideActionShowModal)
      expect(afterShowActionModalProps.onRequestClose).toEqual(
        afterHideActionModalProps.onRequestClose,
      )
    })
  })
})
