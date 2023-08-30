import { onAuthStateChanged } from 'firebase/auth'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../features/authSlice'
import { setPlans } from '../features/drsSlice'
import { auth, db } from '../lib/firebase'

const Listeners = () => {
  const { user } = useSelector((state) => state.auth)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
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
        const tokenResult = await user.getIdTokenResult()
        if (tokenResult.expirationTime < Date.now() / 1000)
          return navigate('/giris')
        dispatch(setUser(filteredUser))
      } else {
        dispatch(setUser(null))
        localStorage.removeItem('user')
        navigate('/giris')
      }
    })

    return () => unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      plans.sort((a, b) => b.date.localeCompare(a.date))
      dispatch(setPlans(plans))
    })
    return () => unsubscribe()
  }, [dispatch, user])

  return null
}

export default Listeners
