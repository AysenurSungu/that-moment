import { useState } from 'react'
import ForgotPassword from '../components/Auth/ForgotPassword'
import Login from '../components/Auth/Login'
import Register from '../components/Auth/Register'

const AuthPage = () => {
  const [state, setState] = useState('login')

  return (
    <div>
      <section className='bg-gray-50 dark:bg-gray-900'>
        <div className='flex flex-col items-center justify-center p-5 mx-auto h-screen lg:py-0'>
          <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0'>
            {state === 'login' && <Login setState={setState} />}
            {state === 'register' && <Register setState={setState} />}
            {state === 'forgotPassword' && (
              <ForgotPassword setState={setState} />
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default AuthPage
