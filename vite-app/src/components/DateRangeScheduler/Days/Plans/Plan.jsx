import classNames from 'classnames'
import { useState } from 'react'
import { HOURS } from '../../../../data/constants'
import { calculatePercentence } from '../../../../utils/utils'
import ExpandedPlan from '../../../MyPlans/Plan'

const Plan = ({ plan }) => {
  const {
    id,
    startHour,
    startMinute,
    endHour,
    endMinute,
    color,
    title,
    noRange,
  } = plan

  const [toggleExpand, setToggleExpand] = useState(false)

  const {
    startHourPercentence,
    startMinutePercentence,
    endHourPercentenge,
    endMinutePercentence,
  } = calculatePercentence({
    HOURS,
    startHour,
    startMinute,
    endHour,
    endMinute,
  })

  return (
    <>
      <li
        key={id}
        className={classNames(
          'px-2 h-8 lg:px-3 lg:h-9 flex items-center cursor-pointer hover:scale-95 transition duration-500 ease-in-out',
          {
            'rounded-md': !noRange,
            'rounded-full w-8 h-8 lg:w-9 lg:h-9': noRange,
            'w-[300px] rounded-xl': toggleExpand,
          }
        )}
        style={{
          background: color,
          marginLeft: `calc(${
            startHourPercentence + startMinutePercentence
          }% - 1px)`,
          marginRight: `calc(${
            100 - (endHourPercentenge + endMinutePercentence)
          }% - 1px)`,
        }}
        onClick={() => setToggleExpand((prev) => !prev)}
      >
        <p className='text-xs lg:text-sm text-slate-800 font-medium whitespace-nowrap truncate'>
          {title}
        </p>
      </li>
      {toggleExpand && (
        <ExpandedPlan
          className='w-full max-w-[300px] -mt-11 z-50 relative after:absolute after:-right-5 after:w-5 after:h-5 after:pointer-events-none'
          plan={plan}
          style={{
            marginLeft: `calc(${
              startHourPercentence + startMinutePercentence
            }% - 1px)`,
          }}
          closeCallback={setToggleExpand}
          startEndTime={`${startHour}:${startMinute} — ${endHour}:${endMinute}`}
        />
      )}
    </>
  )
}

export default Plan
