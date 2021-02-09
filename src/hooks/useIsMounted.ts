import { MutableRefObject, useEffect, useRef } from 'react'

export const useIsMounted = (): MutableRefObject<boolean> => {
  const isMountedRef = useRef(false)

  useEffect(() => {
    if (!isMountedRef.current)
      isMountedRef.current = true;
    return () => {
      isMountedRef.current = false
    }
  }, [])

  return isMountedRef
}
