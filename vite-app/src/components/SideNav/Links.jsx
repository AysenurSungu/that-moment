import { NavLink } from 'react-router-dom'
import { navLinks } from '../../data/data'

const Links = () => {
  return (
    <nav>
      <ul className='flex flex-col items-start gap-6'>
        {navLinks.map(({ to, icon }) => {
          const Icon = icon

          return (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive, isPending }) =>
                  isPending
                    ? 'pending'
                    : isActive
                    ? '[&>span]:bg-blue-100 [&>span>svg]:text-blue-700'
                    : '[&>span]:bg-gray-100 [&>span>svg]:text-gray-600'
                }
              >
                <span className='w-12 h-12 flex items-center justify-center rounded-lg'>
                  <Icon className='text-2xl' />
                </span>
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Links
