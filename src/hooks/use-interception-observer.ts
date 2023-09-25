'use client'
import { useEffect, useRef, useState } from 'react'

export function useInterceptionObserver() {
  const [isObserver, setObserver] = useState(false)
  const fromRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const element = entries[0]
        setObserver(element?.isIntersecting)
      },
      { rootMargin: '20px' }
    )

    if (observer && fromRef.current) observer.observe(fromRef.current)

    return () => {
      if (observer) observer.disconnect()
    }
  }, [fromRef])

  return {
    isObserver,
    fromRef
  }
}
