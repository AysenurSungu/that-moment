import { useSelector } from 'react-redux'
import { setDays, setSelectionRange } from '../../features/drsSlice'
import DateDisplay from './DateDisplay'

const TopBar = () => {
  const { selectionRange } = useSelector((state) => state.drs)

  return (
    <header className='border-b border-gray-200 px-5 h-20 flex items-center justify-between'>
      <DateDisplay
        selectionRange={selectionRange}
        setSelectionRange={setSelectionRange}
        setDays={setDays}
      />
    </header>
  )
}

export default TopBar
