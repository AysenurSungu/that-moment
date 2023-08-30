import { useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { useDetectClickOutside } from 'react-detect-click-outside'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { IoMdColorFilter } from 'react-icons/io'
import { editorColors } from '../../../data/data'

const EditorColors = ({ state, setState, customColor, setCustomColor }) => {
  const [toggleColorPicker, setToggleColorPicker] = useState(false)

  const ref = useDetectClickOutside({
    onTriggered: () => setToggleColorPicker(false),
  })

  return (
    <ul className='flex justify-evenly'>
      {editorColors.map((color, index) => (
        <li
          key={color}
          className='flex-1 h-10 relative isolate'
          style={{ zIndex: state == color && 10 }}
          ref={ref}
        >
          <button
            className='w-full h-full outline-none rounded-t-lg'
            type='button'
            style={{
              background:
                editorColors.length === index + 1
                  ? customColor ?? editorColors[editorColors.length - 1]
                  : color,
            }}
            onClick={() => {
              if (editorColors.length === index + 1) {
                setToggleColorPicker((prev) => !prev)
                setState(color)
              } else {
                setState(color)
                setToggleColorPicker(false)
                setCustomColor(null)
              }
            }}
          />
          {toggleColorPicker && editorColors.length === index + 1 && (
            <div className='absolute top-10 right-0 z-10'>
              <HexColorPicker
                color={customColor ?? editorColors[editorColors.length - 1]}
                onChange={setCustomColor}
              />
            </div>
          )}
          {state === color && editorColors.length !== index + 1 && (
            <BsFillCheckCircleFill className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 text-white pointer-events-none' />
          )}

          {editorColors.length === index + 1 && (
            <IoMdColorFilter className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 text-slate-800 pointer-events-none' />
          )}

          {editorColors.length !== index + 1 && (
            <svg
              className='absolute -bottom-[1px] right-[1px] translate-x-full w-5 h-5 -z-10 pointer-events-none'
              xmlns='http://www.w3.org/2000/svg'
              width='21'
              height='21'
              viewBox='0 0 21 21'
            >
              <path
                id='Path_3'
                data-name='Path 3'
                d='M21,40.17v1.076H0v-21H1.076A20.323,20.323,0,0,0,21,40.168Z'
                transform='translate(0 -20)'
                fill={
                  editorColors.length === index + 1
                    ? customColor ?? editorColors[editorColors.length - 1]
                    : color
                }
              />
            </svg>
          )}

          {state === color && index !== 0 && (
            <svg
              className='absolute -bottom-[1px] left-[1px] -translate-x-full w-5 h-5 -z-10 pointer-events-none'
              xmlns='http://www.w3.org/2000/svg'
              width='21'
              height='21'
              viewBox='0 0 21 21'
            >
              <path
                id='Path_2'
                data-name='Path 2'
                d='M0,40.17v1.076H21v-21H19.923A20.323,20.323,0,0,1,0,40.168Z'
                transform='translate(0 -20)'
                fill={
                  editorColors.length === index + 1
                    ? customColor ?? editorColors[editorColors.length - 1]
                    : color
                }
              />
            </svg>
          )}
        </li>
      ))}
    </ul>
  )
}

export default EditorColors
