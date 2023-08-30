import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import ReactLoading from 'react-loading'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../../features/authSlice'
import { auth } from '../../lib/firebase'

const Register = ({ setState }) => {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit } = useForm()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async ({ email, password }) => {
    try {
      setLoading(true)
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const {
        uid,
        displayName,
        email: currentUserEmail,
        emailVerified,
        photoURL,
      } = user || {}
      const filteredUser = {
        uid,
        displayName,
        email: currentUserEmail,
        emailVerified,
        photoURL,
      }
      dispatch(setUser(filteredUser))
      localStorage.setItem('user', JSON.stringify(filteredUser))
      navigate('/')
      toast.success('Hesap oluşturuldu!')
      setLoading(false)
    } catch (error) {
      setLoading(false)

      console.log(error)

      let errorMessage = 'Bir hata oluştu. Lütfen tekrar deneyin.'

      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Bu e-posta adresi zaten kullanılıyor.'
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Geçerli bir e-posta adresi giriniz.'
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Daha güçlü bir şifre seçiniz.'
      }

      toast.error(errorMessage)
    }
  }

  return (
    <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
      <h1 className='text-xl font-bold leading-tight tracking-tight text-slate-800 md:text-2xl'>
        Hesabını oluştur
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
          <label
            htmlFor='password'
            className='block mb-2 text-sm font-medium text-slate-800 dark:text-white'
          >
            Şifre
          </label>
          <input
            type='password'
            id='password'
            className='bg-gray-50 border border-gray-300 text-slate-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
            placeholder='••••••••'
            disabled={loading}
            {...register('password', { required: true })}
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
              'Kaydol'
            )}
          </button>
        </div>
      </form>
      <p className='text-sm font-light text-slate-400'>
        Hesabınız var mı?{' '}
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

export default Register
