import classNames from 'classnames'
import { ContentState, Editor, EditorState } from 'draft-js'
import { CircularProgressbar } from 'react-circular-progressbar'
import BlockStyles from './BlockStyles'
import EditorColors from './EditorColors'
import InlineStyles from './InlineStyles'

const MAX_CHARACTERS = 1000

const DescriptionEditor = ({
  state,
  setState,
  color,
  setColor,
  customColor,
  setCustomColor,
  disabled,
}) => {
  const handleEditorChange = (newEditorState) => {
    const content = newEditorState.getCurrentContent()
    const currentText = content.getPlainText('')

    if (currentText.length <= MAX_CHARACTERS) {
      setState(newEditorState)
    } else {
      const truncatedText = currentText.slice(0, MAX_CHARACTERS)
      const truncatedContent = ContentState.createFromText(truncatedText)
      const truncatedEditorState =
        EditorState.createWithContent(truncatedContent)
      setState(truncatedEditorState)
    }
  }

  return (
    <div className={classNames({ 'pointer-events-none': disabled })}>
      <EditorColors
        state={color}
        setState={setColor}
        customColor={customColor}
        setCustomColor={setCustomColor}
      />
      <div
        className='relative [&>*]:break-all text-sm text-slate-800 rounded-b-lg overflow-hidden isolate transition'
        style={{
          background: customColor ?? color,
        }}
      >
        <Editor editorState={state} onChange={handleEditorChange} />
        <div className='w-8 h-8 absolute right-2 bottom-2 z-10 pointer-events-none'>
          <CircularProgressbar
            value={state.getCurrentContent().getPlainText('').length}
            maxValue={MAX_CHARACTERS}
            text={`${
              MAX_CHARACTERS - state.getCurrentContent().getPlainText('').length
            }`}
            background
            styles={{
              path: {
                stroke: `rgba(26, 86, 219, ${
                  MAX_CHARACTERS -
                  state.getCurrentContent().getPlainText('').length / 100
                })`,
              },
              trail: {
                stroke: 'rgb(229, 231, 235)',
              },
              text: {
                fill: 'rgb(30, 41, 59)',
                fontSize: '32px',
              },
              background: {
                fill: '#ffffff',
              },
            }}
          />
        </div>
        <div className='h-10 mt-2 flex items-end p-2'>
          <div>
            <InlineStyles editorState={state} setEditorState={setState} />
            <BlockStyles editorState={state} setEditorState={setState} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DescriptionEditor
