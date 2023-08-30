import { LuRectangleHorizontal } from 'react-icons/lu'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link to='/'>
      <span className='w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center shadow-xl shadow-blue-700/40'>
        <LuRectangleHorizontal className='text-white text-3xl' />
      </span>
    </Link>
  )
}

export default Logo
