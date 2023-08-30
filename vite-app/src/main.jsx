import 'draft-js/dist/Draft.css'
import flowbiteJs from 'flowbite/dist/flowbite.min'
import React from 'react'
import 'react-circular-progressbar/dist/styles.css'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Protect from './components/Protect'
import './index.css'
import { store } from './store'

// Pages
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout'
import AuthPage from './pages/Auth'
import Home from './pages/Home'
import MyPlans from './pages/MyPlans'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Protect>
          <Home />
        </Protect>
      </Layout>
    ),
  },
  {
    path: '/giris',
    element: (
      <Layout>
        <AuthPage />
      </Layout>
    ),
  },
  {
    path: '/planlarim',
    element: (
      <Layout>
        <Protect>
          <MyPlans />
        </Protect>
      </Layout>
    ),
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <script src={flowbiteJs} />
      <Toaster />
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
)
