import { addDays, format } from 'date-fns'
import { tr } from 'date-fns/esm/locale'
import { useEffect, useState } from 'react'
import { useDetectClickOutside } from 'react-detect-click-outside'
import { useDispatch } from 'react-redux'
import Calendar from './Calendar'

const DateDisplay = ({ selectionRange, setSelectionRange, setDays }) => {
  const { startDate, endDate } = selectionRange

  const [toggleCalendar, setToggleCalendar] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const currentDate = addDays(startDate, i)
      return {
        date: format(currentDate, 'yyyy-MM-dd'),
        name: currentDate.toLocaleDateString('tr-TR', { weekday: 'long' }),
      }
    })
    dispatch(setDays(days))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const ref = useDetectClickOutside({
    onTriggered: () => setToggleCalendar(false),
  })

  return (
    <>
      <div
        className='relative isolate z-[60] mx-auto max-w-[280px] lg:max-w-[300px] w-full'
        ref={ref}
      >
        <div className='relative isolate flex cursor-pointer mx-auto w-fit'>
          <div className='absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3 rounded-r-full bg-white z-10 pointer-events-none' />
          <div className='absolute right-0 top-1/2 -translate-y-1/2 w-1 h-3 rounded-l-full bg-white z-10 pointer-events-none' />

          <p
            className='bg-gray-200 p-3 pr-2 rounded-md rounded-r-lg text-sm font-medium text-slate-800 select-none'
            onClick={() => setToggleCalendar((prev) => !prev)}
          >
            {format(startDate, 'dd MMM, yyyy', { locale: tr })}
          </p>
          <p
            className='bg-gray-200 p-3 pl-2 rounded-md rounded-l-lg text-sm font-medium text-slate-800 select-none'
            onClick={() => setToggleCalendar((prev) => !prev)}
          >
            {format(endDate, 'dd MMM, yyyy', { locale: tr })}
          </p>
        </div>
        {toggleCalendar && (
          <div className='absolute mt-2'>
            <Calendar
              selectionRange={selectionRange}
              setSelectionRange={setSelectionRange}
              setDays={setDays}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default DateDisplay
