import classNames from 'classnames'
import { useRef } from 'react'

const DropdownCol = ({ state, setState, data }) => {
  const parentRef = useRef(null)

  const scrollIntoView = (index, ref) => {
    if (ref.current) {
      const buttonElement = ref.current.children[index]
      if (buttonElement) {
        const refTop = ref.current.getBoundingClientRect().top
        const buttonTop = buttonElement.getBoundingClientRect().top
        const scrollTop = buttonTop - refTop + ref.current.scrollTop
        ref.current.scrollTo({ top: scrollTop, behavior: 'smooth' })
      }
    }
  }

  const onClick = (index, hour) => {
    setState(hour)
    scrollIntoView(index, parentRef)
  }

  return (
    <ul
      className='h-64 pb-56 overflow-y-auto scrollbar-none w-full'
      ref={parentRef}
    >
      {data.map((item, index) => (
        <li key={item} className='group'>
          <button
            type='button'
            className={classNames(
              'w-full px-4 h-8 text-xs lg:text-sm font-medium flex items-center justify-center lg:transition lg:duration-200',
              {
                'text-slate-800 lg:group-hover:bg-gray-200': state !== item,
                'bg-blue-700 text-white lg:group-hover:bg-blue-800':
                  state === item,
              }
            )}
            onClick={() => onClick(index, item)}
          >
            {item}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default DropdownCol
