import { format } from 'date-fns'
import { tr } from 'date-fns/esm/locale'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import HourSlices from './HourSlices'
import Plans from './Plans'

const Day = ({ day, index }) => {
  const { date, name } = day

  const { plans } = useSelector((state) => state.drs)

  const plansOfTheDay = plans.filter((plan) => plan.date === date)

  return (
    <motion.li
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        opacity: { duration: 0.1 },
        y: { duration: 0.3 },
        delay: index * 0.2,
      }}
      exit={{
        opacity: 0,
        y: 32,
        transition: {
          opacity: { duration: 0.05 },
          y: { duration: 0.1 },
          delay: index * 0.08,
        },
      }}
      className='px-5 pt-10 border-b border-gray-200 overflow-x-auto shrink-0 scrollbar-thin'
    >
      <div className='flex gap-4 items-center min-w-[1280px] lg:min-w-[1024px]'>
        <div className='flex flex-col gap-1 w-20 lg:w-24'>
          <p className='text-sm font-medium text-slate-800'>{name}</p>
          <p className='text-xs text-slate-500'>
            {format(new Date(date), 'dd MMM, yyyy', {
              locale: tr,
            })}
          </p>
        </div>
        <div className='relative w-full'>
          <HourSlices />
          <Plans plans={plansOfTheDay} />
        </div>
      </div>
    </motion.li>
  )
}

export default Day
