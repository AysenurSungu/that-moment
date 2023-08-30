import { sendPasswordResetEmail } from 'firebase/auth'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import ReactLoading from 'react-loading'
import { auth } from '../../lib/firebase'

const ForgotPassword = ({ setState }) => {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit } = useForm()

  const onSubmit = async ({ email }) => {
    try {
      setLoading(true)
      await sendPasswordResetEmail(auth, email)
      toast.success('Şifreni sıfırlamak için epostanı kontrol et')
      setLoading(false)
    } catch (error) {
      setLoading(false)

      console.log(error)

      let errorMessage = 'Bir hata oluştu. Lütfen tekrar deneyin.'

      if (error.code === 'auth/user-not-found') {
        errorMessage = 'Bu e-posta adresine sahip bir kullanıcı bulunamadı.'
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Geçerli bir e-posta adresi giriniz.'
      }

      toast.error(errorMessage)
    }
  }

  return (
    <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
      <h1 className='text-xl font-bold leading-tight tracking-tight text-slate-800 md:text-2xl'>
        Şifreni sıfırla
      </h1>
      <form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor='email'
            className='block mb-2 text-sm font-medium text-slate-800 dark:text-white'
          >
            Eposta
          </label>
          <input
            type='email'
            id='email'
            className='bg-gray-50 border border-gray-300 text-slate-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
            placeholder='company@mail.com'
            disabled={loading}
            {...register('email', { required: true })}
          />
        </div>
        <div>
          <button
            type='submit'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full py-2.5 text-center'
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
              'Sıfırla'
            )}
          </button>
        </div>
      </form>
      <p className='text-sm font-light text-slate-400'>
        Şifreni mi hatırladın?{' '}
        <button
          className='font-medium text-blue-700 hover:underline'
          onClick={() => setState('login')}
          disabled={loading}
        >
          Oturum aç
        </button>
      </p>
    </div>
  )
}

export default ForgotPassword
