import classNames from 'classnames'
import { RichUtils } from 'draft-js'
import { BiBold } from 'react-icons/bi'
import { FaItalic } from 'react-icons/fa'
import { ImUnderline } from 'react-icons/im'

const InlineStyles = (props) => {
  const InlineStyleTypes = [
    {
      value: <BiBold className='text-2xl translate-y-0.5' />,
      style: 'BOLD',
    },
    {
      value: <FaItalic className='text-[17px] -translate-y-0.5' />,
      style: 'ITALIC',
    },
    {
      value: <ImUnderline className='text-[19px]' />,
      style: 'UNDERLINE',
    },
  ]

  const setInlineStyle = (event) => {
    event.preventDefault()
    let style = event.currentTarget.getAttribute('use-style')
    props.setEditorState(RichUtils.toggleInlineStyle(props.editorState, style))
  }

  const renderInlineStyleButton = (value, style) => {
    const currentInlineStyle = props.editorState.getCurrentInlineStyle()
    let styleActive = ''
    if (currentInlineStyle.has(style)) {
      styleActive = 'active'
    }
    return (
      <button
        className={classNames(
          'px-1 inline-flex items-center justify-center text-slate-800 [&.active]:text-blue-700 transition',
          styleActive
        )}
        type='button'
        key={style}
        value={value}
        // eslint-disable-next-line react/no-unknown-property
        use-style={style}
        onMouseDown={setInlineStyle}
      >
        {value}
      </button>
    )
  }

  return (
    <>
      {InlineStyleTypes.map((button) => {
        return renderInlineStyleButton(button.value, button.style)
      })}
    </>
  )
}

export default InlineStyles
