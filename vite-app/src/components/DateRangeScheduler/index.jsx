import Days from './Days'
import New from './New'
import TopBar from './TopBar'

const DateRangeScheduler = () => {
  return (
    <div className='flex'>
      <div className='flex flex-col w-full lg:h-screen overflow-x-hidden min-h-screen lg:min-h-[unset]'>
        <TopBar />
        <Days />
      </div>
      <div className='hidden lg:block lg:h-screen lg:overflow-y-auto lg:scrollbar-thin lg:scrollbar-thumb-gray-200 shrink-0'>
        <New />
      </div>
    </div>
  )
}

export default DateRangeScheduler
