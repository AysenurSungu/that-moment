import classNames from 'classnames'
import { RichUtils } from 'draft-js'
import { FaListUl } from 'react-icons/fa'

const BlockStyles = (props) => {
  const BlockStyleTypes = [
    {
      value: <FaListUl className='text-xl' />,
      block: 'unordered-list-item',
    },
  ]

  const setBlockType = (event) => {
    event.preventDefault()
    let type = event.currentTarget.getAttribute('use-type')
    props.setEditorState(RichUtils.toggleBlockType(props.editorState, type))
  }

  const renderBlockTypeButton = (value, block) => {
    const currentBlockType = RichUtils.getCurrentBlockType(props.editorState)
    let typeActive = ''
    if (currentBlockType === block) {
      typeActive = 'active'
    }

    return (
      <button
        className={classNames(
          'px-1.5 inline-flex items-center justify-center text-slate-800 [&.active]:text-blue-700 transition',
          typeActive
        )}
        type='button'
        key={block}
        // eslint-disable-next-line react/no-unknown-property
        use-type={block}
        onMouseDown={setBlockType}
      >
        {value}
      </button>
    )
  }

  return (
    <>
      {BlockStyleTypes.map((button) => {
        return renderBlockTypeButton(button.value, button.block)
      })}
    </>
  )
}

export default BlockStyles
