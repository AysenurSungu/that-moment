import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { DateRangePicker } from 'react-date-range'
import { useDispatch } from 'react-redux'

const Calendar = ({ selectionRange, setSelectionRange, setDays }) => {
  const dispatch = useDispatch()

  const handleSelect = (ranges) => {
    dispatch(setSelectionRange(ranges.selection))
    generateDateList(ranges.selection.startDate, ranges.selection.endDate)
  }

  const generateDateList = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const dayList = []

    while (start <= end) {
      dayList.push({
        date: format(start, 'yyyy-MM-dd'),
        name: start.toLocaleDateString('tr-TR', {
          weekday: 'long',
        }),
      })
      start.setDate(start.getDate() + 1)
    }

    dispatch(setDays(dayList))
  }

  return (
    <DateRangePicker
      className='border border-gray-200 rounded-md overflow-hidden'
      locale={tr}
      ranges={[selectionRange]}
      onChange={handleSelect}
      staticRanges={[]}
      inputRanges={[]}
      showDateDisplay={false}
    />
  )
}

export default Calendar
