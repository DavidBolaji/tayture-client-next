import { useGlobalContext } from '@/Context/store'
import { useEffect } from 'react'

const useSetProfile = (id: number) => {
  const {} = useGlobalContext()
  useEffect(() => {}, [id])
  return null
}

export default useSetProfile
