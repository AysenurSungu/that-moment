import classNames from 'classnames'
import { tr } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import { Calendar } from 'react-date-range'
import { useDetectClickOutside } from 'react-detect-click-outside'
import ReactLoading from 'react-loading'
import TimePicker from '../../TimePicker'
import DescriptionEditor from './DescriptionEditor'

const Form = ({
  className,
  register,
  handleSubmit,
  onSubmit,
  resetForm,
  loading,
  selectedDate,
  setSelectedDate,
  startHour,
  setStartHour,
  startMinute,
  setStartMinute,
  endHour,
  setEndHour,
  endMinute,
  setEndMinute,
  descriptionRaw,
  setDescriptionRaw,
  color,
  setColor,
  customColor,
  setCustomColor,
  cancelCallback,
  defaultValues,
  closeCallback,
}) => {
  const [disableClick, setDisableClick] = useState(true)
  const ref = useDetectClickOutside({
    onTriggered: () => (cancelCallback ? cancelCallback(false) : null),
    disableClick,
  })
  useEffect(() => {
    setDisableClick(false)
    return () => setDisableClick(true)
  }, [])

  return (
    <form
      className={classNames('flex flex-col gap-2', className)}
      onSubmit={handleSubmit(onSubmit)}
      ref={ref}
    >
      <Calendar
        locale={tr}
        minDate={new Date()}
        minTime={new Date().getTime()}
        date={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        className={classNames('w-full', {
          'pointer-events-none': loading,
        })}
      />
      <div className='flex gap-2 px-5'>
        <div className='flex-1'>
          <label
            htmlFor='startTime'
            className='block mb-2 text-sm font-medium text-slate-800 dark:text-white'
          >
            Başlangıç saati
          </label>
          <TimePicker
            id='startTime'
            hour={startHour}
            setHour={setStartHour}
            minute={startMinute}
            setMinute={setStartMinute}
            disabled={loading}
          />
        </div>
        <div className='flex-1'>
          <label
            htmlFor='endTime'
            className='block mb-2 text-sm font-medium text-slate-800 dark:text-white'
          >
            Bitiş saati
          </label>
          <TimePicker
            id='endTime'
            hour={endHour}
            setHour={setEndHour}
            minute={endMinute}
            setMinute={setEndMinute}
            disabled={loading}
          />
        </div>
      </div>

      <div className='pt-2 px-5'>
        <label
          htmlFor='title'
          className='block mb-2 text-sm font-medium text-slate-800 dark:text-white'
        >
          Başlık
        </label>
        <input
          type='text'
          id='title'
          className='bg-gray-50 border border-gray-300 text-slate-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
          disabled={loading}
          defaultValue={defaultValues?.title}
          {...register('title', { required: true })}
        />
      </div>

      <div className='pt-2 px-5'>
        <label
          htmlFor='message'
          className='block mb-2 text-sm font-medium text-slate-800 dark:text-white'
        >
          Açıklama{' '}
          <span className='text-slate-400 font-normal'>(Opsiyonel)</span>
        </label>
        <DescriptionEditor
          state={descriptionRaw}
          setState={setDescriptionRaw}
          color={color}
          setColor={setColor}
          customColor={customColor}
          setCustomColor={setCustomColor}
          disabled={loading}
        />
      </div>

      <div className='flex items-start pt-2 px-5'>
        <div className='flex items-center h-5'>
          <input
            id='startOfTheRangeOnly'
            type='checkbox'
            value=''
            className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300'
            disabled={loading}
            defaultChecked={defaultValues?.noRange}
            {...register('noRange')}
          />
        </div>
        <label
          htmlFor='startOfTheRangeOnly'
          className='ml-2 text-sm font-medium text-slate-800 dark:text-gray-300'
        >
          Sadece başlangıç tarihini işaretle
        </label>
      </div>
      <div className='mt-3 pb-5 px-5 flex flex-col gap-2'>
        <button
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center'
        >
          {loading ? (
            <ReactLoading
              type='spin'
              color='#fff'
              width={16}
              height={16}
              className='mx-auto'
            />
          ) : (
            'Kaydet'
          )}
        </button>
        {resetForm && (
          <button
            type='button'
            className='py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 w-full'
            onClick={resetForm}
            disabled={loading}
          >
            Sıfırla
          </button>
        )}
        {cancelCallback && (
          <button
            type='button'
            className='py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 w-full'
            onClick={() => cancelCallback(false)}
            disabled={loading}
          >
            İptal
          </button>
        )}
        {closeCallback && (
          <button
            type='button'
            className='py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 w-full'
            onClick={() => closeCallback(false)}
            disabled={loading}
          >
            Kapat
          </button>
        )}
      </div>
    </form>
  )
}

export default Form
