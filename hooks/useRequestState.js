import { useCallback, useState } from 'react'

const useRequestState = () => {
  const [loading, setLoading] = useState(false)
  const [error, setErrorState] = useState('')

  const start = useCallback(() => {
    setLoading(true)
    setErrorState(undefined)
  }, [])

  const end = useCallback(() => {
    setLoading(false)
  }, [])

  const setError = useCallback((msg) => {
    setErrorState(msg)
    setLoading(false)
  }, [])

  return {
    loading,
    error,
    start,
    end,
    setError,
  }
}

export default useRequestState