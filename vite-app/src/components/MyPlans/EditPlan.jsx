import { format, isAfter, isBefore, isSameMinute, parse } from 'date-fns'
import { ContentState, EditorState, convertFromHTML } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { doc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { editorColors } from '../../data/data'
import { db } from '../../lib/firebase'
import Form from '../DateRangeScheduler/New/Form'

const EditPlan = ({ setState, defaultValues }) => {
  const isCustomColor = !editorColors.includes(defaultValues.color)

  let initialEditorState
  if (defaultValues.description) {
    const contentState = ContentState.createFromBlockArray(
      convertFromHTML(defaultValues.description)
    )
    initialEditorState = EditorState.createWithContent(contentState)
  } else {
    initialEditorState = () => EditorState.createEmpty()
  }

  const { user } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date(defaultValues.date))
  const [startHour, setStartHour] = useState(defaultValues.startHour)
  const [startMinute, setStartMinute] = useState(defaultValues.startMinute)
  const [endHour, setEndHour] = useState(defaultValues.endHour)
  const [endMinute, setEndMinute] = useState(defaultValues.endMinute)
  const [color, setColor] = useState(null)
  const [customColor, setCustomColor] = useState(null)
  const [descriptionRaw, setDescriptionRaw] = useState(initialEditorState)
  const [description, setDescription] = useState(null)

  const { register, handleSubmit, setValue } = useForm()

  useEffect(() => {
    if (isCustomColor) {
      setColor(editorColors[editorColors.length - 1])
      setCustomColor(defaultValues.color)
    } else {
      setColor(defaultValues.color)
    }
  }, [defaultValues.color, isCustomColor])

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
      await updateDoc(doc(db, 'plans', defaultValues.id), data)
      toast.success('Plan güncellendi!')
      setLoading(false)
      setState(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error('Plan güncellenirken bir hata oluştu!')
    }
  }

  return (
    <div className='fixed inset-0 z-[999] isolate bg-white/30 backdrop-blur-lg overflow-y-auto'>
      <div className='w-full max-w-sm mx-auto min-h-screen p-5 flex items-center justify-center'>
        <div className='bg-white border border-gray-200 rounded-lg shadow-lg shadow-slate-500/10 overflow-hidden'>
          <Form
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
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
            cancelCallback={setState}
            defaultValues={defaultValues}
          />
        </div>
      </div>
    </div>
  )
}

export default EditPlan
