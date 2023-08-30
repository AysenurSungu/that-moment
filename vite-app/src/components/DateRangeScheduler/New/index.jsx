import { format, isAfter, isBefore, isSameMinute, parse } from 'date-fns'
import { ContentState, EditorState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { addDoc, collection } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { editorColors } from '../../../data/data'
import { auth, db } from '../../../lib/firebase'
import Form from './Form'

const New = ({ closeCallback }) => {
  const { user } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [startHour, setStartHour] = useState('00')
  const [startMinute, setStartMinute] = useState('00')
  const [endHour, setEndHour] = useState('00')
  const [endMinute, setEndMinute] = useState('00')
  const [color, setColor] = useState(editorColors[0])
  const [customColor, setCustomColor] = useState(null)
  const [descriptionRaw, setDescriptionRaw] = useState(() =>
    EditorState.createEmpty()
  )
  const [description, setDescription] = useState(null)

  const { register, handleSubmit, reset, setValue } = useForm()

  useEffect(() => {
    setDescription(stateToHTML(descriptionRaw.getCurrentContent()))
  }, [descriptionRaw])

  useEffect(() => {
    if (selectedDate) {
      setValue('date', format(selectedDate, 'yyyy-MM-dd'))
    }
    if (startHour) {
      setValue('startHour', startHour)
    }
    if (startMinute) {
      setValue('startMinute', startMinute)
    }
    if (endHour) {
      setValue('endHour', endHour)
    }
    if (endMinute) {
      setValue('endMinute', endMinute)
    }
    if (color || customColor) {
      setValue('color', customColor ?? color)
    }
    if (description) {
      const content = descriptionRaw.getCurrentContent()
      const currentText = content.getPlainText('')
      if (currentText === '') return setValue('description', null)
      setValue('description', description)
    }
  }, [
    selectedDate,
    startHour,
    startMinute,
    endHour,
    endMinute,
    color,
    customColor,
    description,
    descriptionRaw,
    setValue,
  ])

  const resetForm = () => {
    setSelectedDate(new Date())
    setStartHour('00')
    setStartMinute('00')
    setEndHour('00')
    setEndMinute('00')
    setColor(editorColors[0])
    setCustomColor(null)
    const emptyContent = ContentState.createFromText('')
    const emptyEditorState = EditorState.createWithContent(emptyContent)
    setDescriptionRaw(emptyEditorState)
    setDescription(null)
    reset()
  }

  const onSubmit = async (data) => {
    if (!user) return toast.error('Lütfen oturum açın!')

    const startTime = `${data.startHour}:${data.startMinute}`
    const endTime = `${data.endHour}:${data.endMinute}`
    const currentDate = new Date()
    const startDateTime = parse(startTime, 'HH:mm', currentDate)
    const endDateTime = parse(endTime, 'HH:mm', currentDate)

    if (isAfter(startDateTime, endDateTime))
      return toast.error('Başlangıç saati bitiş saatinden büyük olamaz')

    if (isBefore(endDateTime, startDateTime))
      return toast.error('Bitiş saati başlangıç saatinden küçük olamaz')

    if (isSameMinute(startDateTime, endDateTime))
      return toast.error('Başlangıç ve bitiş aynı dakikada olamaz')

    try {
      setLoading(true)
      await addDoc(collection(db, 'plans'), {
        userId: auth.currentUser.uid,
        ...data,
        createdAt: new Date(),
      })
      resetForm()
      toast.success('Plan oluşturuldu!')
      setLoading(false)
      if (closeCallback) {
        closeCallback()
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error('Plan oluşturulurken bir hata oluştu!')
    }
  }

  return (
    <Form
      className='bg-white border lg:border-l rounded-lg lg:rounded-none border-gray-200 lg:w-full lg:max-w-sm overflow-hidden'
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      resetForm={resetForm}
      loading={loading}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      startHour={startHour}
      setStartHour={setStartHour}
      startMinute={startMinute}
      setStartMinute={setStartMinute}
      endHour={endHour}
      setEndHour={setEndHour}
      endMinute={endMinute}
      setEndMinute={setEndMinute}
      descriptionRaw={descriptionRaw}
      setDescriptionRaw={setDescriptionRaw}
      color={color}
      setColor={setColor}
      customColor={customColor}
      setCustomColor={setCustomColor}
      closeCallback={closeCallback}
    />
  )
}

export default New
