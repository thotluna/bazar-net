'use client'
import { LIMIT_DEFAULT } from '@/modules/products/infrastructure/api-repository'
import debounce from 'just-debounce-it'
import { useCallback, useEffect, useState } from 'react'

interface Props {
  originalPage: number
  total: number
  isObserver: boolean
}

export function usePagination(pageOrigin: number, total: number, isObserver: boolean) {
  const [page, setPage] = useState(pageOrigin)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const nextPageHandler = useCallback(
    debounce(() => {
      setPage((prev) => ((page - 1) * LIMIT_DEFAULT >= total ? prev : prev + 1))
    }, 1000),
    [page, total]
  )

  useEffect(() => {
    if (isObserver) nextPageHandler()
  }, [isObserver, nextPageHandler])

  return {
    page
  }
}
