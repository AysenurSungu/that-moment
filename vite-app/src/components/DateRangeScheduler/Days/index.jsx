import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPlans } from '../../../features/drsSlice'
import { auth, db } from '../../../lib/firebase'
import Day from './Day'

const Days = () => {
  const { days } = useSelector((state) => state.drs)
  const { user } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!auth?.currentUser) return
    const plansCollection = collection(db, 'plans')
    const userPlansQuery = query(
      plansCollection,
      where('userId', '==', auth.currentUser.uid)
    )
    const unsubscribe = onSnapshot(userPlansQuery, (snapshot) => {
      const plans = []
      snapshot.forEach((doc) => {
        const planData = doc.data()
        const planId = doc.id
        const createdAtDate = planData.createdAt.toDate().toISOString()
        plans.push({ ...planData, id: planId, createdAt: createdAtDate })
      })
      dispatch(setPlans(plans))
    })
    return () => unsubscribe()
  }, [dispatch, user])

  return (
    <ul className='flex flex-col gap-2 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 pb-5'>
      <AnimatePresence mode='wait'>
        {days?.map((day, index) => (
          <Day key={day.date} day={day} index={index + 1} />
        ))}
      </AnimatePresence>
    </ul>
  )
}

export default Days
