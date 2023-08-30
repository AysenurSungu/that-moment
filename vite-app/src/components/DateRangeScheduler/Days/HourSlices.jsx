import { HOURS } from '../../../data/constants'

const HourSlices = () => {
  return (
    <div className='absolute inset-0 flex items-center justify-between pt-6 -z-10'>
      {[...Array(HOURS).keys()].map((index) => {
        return (
          <div
            className='w-[1px] h-full bg-gray-200 pointer-events-none'
            key={index}
          >
            <div className='absolute w-[9px] h-[9px] bg-gray-200 rounded-full -translate-x-1/2' />
            <p className='text-xs text-slate-400 -rotate-90 -translate-y-6 pointer-events-none select-none'>
              {index < 10 && '0'}
              {index}:00
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default HourSlices
