import { signOut } from 'firebase/auth'
import { useState } from 'react'
import { useDetectClickOutside } from 'react-detect-click-outside'
import { FiLogOut, FiUser } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { auth } from '../lib/firebase'
import Avatar from './Avatar'

const Display = () => (
  <div className='flex flex-col items-center gap-2 mt-auto bg-gray-100 rounded-full p-2.5'>
    <Avatar />
    <button
      className='w-12 h-12 flex items-center justify-center rounded-lg text-gray-600'
      onClick={() => signOut(auth)}
    >
      <FiLogOut className='text-2xl' />
    </button>
  </div>
)

const UserDisplay = ({ mobile }) => {
  const { user } = useSelector((state) => state.auth)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  const navigate = useNavigate()

  const ref = useDetectClickOutside({
    onTriggered: () => setToggleDropdown(false),
  })

  if (mobile)
    return (
      <li ref={ref}>
        <button
          className='w-12 h-12 flex items-center justify-center rounded-lg text-gray-600'
          onClick={() => {
            if (!user) return navigate('/giris')
            setToggleDropdown((prev) => !prev)
          }}
        >
          <FiUser className='text-lg' />
        </button>
        {toggleDropdown && (
          <div className='absolute top-2 -translate-y-full -translate-x-2 z-50'>
            {user && <Display />}
          </div>
        )}
      </li>
    )

  return <Display />
}

export default UserDisplay
