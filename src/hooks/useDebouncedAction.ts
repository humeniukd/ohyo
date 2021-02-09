import { useCallback, useRef } from 'react'

const DEFAULT_DELAY = 500

export const useDebouncedAction = () => {
  const timerRef = useRef<number>()

  return useCallback((action: (...args: any) => void, delay: number = DEFAULT_DELAY) => {
    clearTimeout(timerRef.current)
    // @ts-ignore
    timerRef.current = setTimeout(action, delay)
  }, [])
}
