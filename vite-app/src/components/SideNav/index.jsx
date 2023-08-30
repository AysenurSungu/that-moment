import { useSelector } from 'react-redux'
import UserDisplay from '../UserDisplay'
import Links from './Links'
import Logo from './Logo'

const SideNav = () => {
  const { user } = useSelector((state) => state.auth)

  return (
    <aside className='h-screen overflow-y-auto scrollbar-none px-8 py-10 hidden lg:flex flex-col gap-16 items-center border-r border-gray-200'>
      <Logo />
      <Links />
      {user && <UserDisplay />}
    </aside>
  )
}

export default SideNav
