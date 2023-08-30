import DropdownCol from './DropdownCol'
import { hours, minutes } from './data'

const Dropdown = ({ hour, setHour, minute, setMinute }) => {
  return (
    <div className='absolute top-full translate-y-2 left-0 right-0 border border-gray-200 bg-white z-10 rounded-lg overflow-hidden flex isolate'>
      <DropdownCol state={hour} setState={setHour} data={hours} />
      <div className='w-[1px] bg-gray-200 z-10' />
      <DropdownCol state={minute} setState={setMinute} data={minutes} />
    </div>
  )
}

export default Dropdown
