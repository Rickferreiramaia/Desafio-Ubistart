import { useHistory } from 'react-router-dom'
import { useLayoutEffect } from 'react'
import { goToMain } from '../routes/coordinator'

const useUnprotectedPage = () => {
  const history = useHistory()
  useLayoutEffect(() => {
    const token = localStorage.getItem('token')
    if (token){
      goToMain(history)
    }
  }, [history])
}

export default useUnprotectedPage
