import { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { navLinks } from '../../data/data'
import New from '../DateRangeScheduler/New'
import UserDisplay from '../UserDisplay'

const navLinksFirstHalf = navLinks.slice(0, navLinks.length / 2)
const navLinksLastHalf = navLinks.slice(navLinks.length / 2)

const BottomNav = () => {
  const [toggleNew, setToggleNew] = useState(false)
  const { user } = useSelector((state) => state.auth)

  const navigate = useNavigate()

  return (
    <>
      {toggleNew && (
        <div className='fixed inset-0 z-[999] isolate bg-white/30 backdrop-blur-lg overflow-y-auto'>
          <div className='w-full max-w-sm mx-auto min-h-screen p-5 flex items-center justify-center'>
            <div className='rounded-lg shadow-lg shadow-slate-500/10 overflow-hidden'>
              <New closeCallback={() => setToggleNew(false)} />
            </div>
          </div>
        </div>
      )}
      <nav className='fixed lg:hidden bottom-0 left-0 right-0 bg-white z-[60] px-5 py-1 shadow-2xl shadow-slate-800/50 border-t border-gray-200'>
        <ul className='flex items-start justify-evenly gap-2'>
          {navLinksFirstHalf.map(({ to, icon }) => {
            const Icon = icon

            return (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? 'pending'
                      : isActive
                      ? '[&>span>svg]:text-blue-700'
                      : '[&>span>svg]:text-gray-600'
                  }
                >
                  <span className='w-12 h-12 flex items-center justify-center rounded-lg'>
                    <Icon className='text-2xl' />
                  </span>
                </NavLink>
              </li>
            )
          })}

          {navLinksLastHalf.map(({ to, icon }) => {
            const Icon = icon

            return (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? 'pending'
                      : isActive
                      ? '[&>span>svg]:text-blue-700'
                      : '[&>span>svg]:text-gray-600'
                  }
                >
                  <span className='w-12 h-12 flex items-center justify-center rounded-lg'>
                    <Icon className='text-2xl' />
                  </span>
                </NavLink>
              </li>
            )
          })}

          <li>
            <button
              className='w-12 h-12 flex items-center justify-center rounded-lg'
              onClick={() => {
                if (!user) return navigate('/giris')
                setToggleNew(true)
              }}
            >
              <FiPlus className='text-2xl text-gray-600' />
            </button>
          </li>

          <UserDisplay mobile />
        </ul>
      </nav>
    </>
  )
}

export default BottomNav
