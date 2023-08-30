import { FiXCircle } from 'react-icons/fi'

const Input = ({
  id,
  state,
  setState,
  setHour,
  setMinute,
  setToggleDropdown,
}) => {
  return (
    <div className='relative'>
      <input
        type='text'
        id={id}
        className='bg-gray-50 border border-gray-300 text-slate-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer'
        name='title'
        value={state}
        onChange={(e) => setState(e.target.value)}
        onClick={() => setToggleDropdown((prev) => !prev)}
        readOnly
      />
      <button
        type='button'
        className='absolute top-1/2 right-0 -translate-y-1/2 px-2 py-3 group'
        onClick={() => {
          setState('00:00')
          setHour('00')
          setMinute('00')
          setToggleDropdown(false)
        }}
      >
        <FiXCircle className='text-gray-400 group-hover:text-gray-500 transition' />
      </button>
    </div>
  )
}

export default Input
