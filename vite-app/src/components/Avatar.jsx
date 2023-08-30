import { FiUser } from 'react-icons/fi'
import { useSelector } from 'react-redux'

const Avatar = () => {
  const { user } = useSelector((state) => state.auth)

  return (
    <div className='w-11 h-11 rounded-full overflow-hidden bg-blue-700 flex items-center justify-center shrink-0'>
      {user?.photoURL ? (
        <img
          src={user.photoURL}
          className='w-full h-full object-cover'
          alt='Profil fotoğrafı'
        />
      ) : (
        <FiUser className='text-white' />
      )}
    </div>
  )
}

export default Avatar
