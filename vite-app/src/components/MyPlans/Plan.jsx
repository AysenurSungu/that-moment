import classNames from 'classnames'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { deleteDoc, doc } from 'firebase/firestore'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { FiCheck, FiEdit2, FiTrash, FiX } from 'react-icons/fi'
import ReactLoading from 'react-loading'
import { db } from '../../lib/firebase'
import EditPlan from './EditPlan'

const Plan = ({ className, style, plan, closeCallback, startEndTime }) => {
  const { id, title, description, color, date } = plan

  const [loading, setLoading] = useState(false)
  const [toggleDelete, setToggleDelete] = useState(false)
  const [toggleEdit, setToggleEdit] = useState(false)

  const handleDelete = async () => {
    try {
      setLoading(true)
      deleteDoc(doc(db, 'plans', id))
      setToggleDelete(false)
      setLoading(false)
      toast.success('Plan silindi!')
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error('Plan silinirken bir hata oluştu!')
    }
  }

  return (
    <>
      <li
        className={classNames(
          'rounded-xl p-6 pb-4 flex flex-col gap-2 hover:scale-105 transition duration-500',
          className
        )}
        style={{
          background: color,
          flex: '0 1 300px',
          ...style,
        }}
      >
        <div className='flex justify-between gap-3'>
          <h1 className='text-lg font-bold leading-tight tracking-tight text-slate-800 break-all'>
            {title}
          </h1>
          {closeCallback && (
            <button
              className='w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:scale-105 transition duration-300 shrink-0'
              onClick={() => closeCallback(false)}
            >
              <FiX className='text-white' />
            </button>
          )}
        </div>
        <div
          className='h-[180px] overflow-y-auto break-words scrollbar-none prose-sm prose-p:text-slate-800 prose-li:list-disc'
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <div className='flex items-center justify-between pt-2 mt-auto'>
          <p className='text-xs text-slate-800'>
            {startEndTime
              ? startEndTime
              : format(new Date(date), 'dd MMM, yyyy', { locale: tr })}
          </p>
          <div className='flex gap-1'>
            <div>
              {!toggleDelete ? (
                <button
                  className='bg-slate-800 w-9 h-9 rounded-full flex items-center justify-center hover:scale-105 transition duration-300'
                  onClick={() => setToggleDelete(true)}
                >
                  <FiTrash className='text-white' />
                </button>
              ) : (
                <div className='flex bg-slate-800 rounded-full'>
                  <button
                    className='bg-slate-800 w-9 h-9 rounded-l-full flex items-center justify-center hover:bg-slate-600 transition duration-300'
                    onClick={handleDelete}
                    disabled={loading}
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
                      <FiCheck className='text-white translate-x-0.5' />
                    )}
                  </button>
                  <button
                    className='bg-slate-800 w-9 h-9 rounded-r-full flex items-center justify-center hover:bg-slate-600 transition duration-300'
                    onClick={() => setToggleDelete(false)}
                    disabled={loading}
                  >
                    <FiX className='text-white -translate-x-0.5' />
                  </button>
                </div>
              )}
            </div>
            <button
              className='w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:scale-105 transition duration-300'
              onClick={() => setToggleEdit(true)}
            >
              <FiEdit2 className='text-white' />
            </button>
          </div>
        </div>
      </li>
      {toggleEdit && <EditPlan setState={setToggleEdit} defaultValues={plan} />}
    </>
  )
}

export default Plan
