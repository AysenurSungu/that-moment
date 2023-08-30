import BottomNav from './BottomNav'
import Listeners from './Listeners'
import SideNav from './SideNav'

const Layout = ({ children }) => {
  return (
    <>
      <Listeners />
      <div className='lg:grid lg:grid-cols-[128px,1fr]'>
        <SideNav />
        <BottomNav />
        {children}
      </div>
    </>
  )
}

export default Layout
