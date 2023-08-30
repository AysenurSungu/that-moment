import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Protect = ({ children }) => {
  const { user } = useSelector((state) => state.auth)

  return user ? children : <Navigate to='/giris' />
}

export default Protect
