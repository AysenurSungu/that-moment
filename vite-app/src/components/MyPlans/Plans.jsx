import Plan from './Plan'

import { useSelector } from 'react-redux'

const Plans = () => {
  const { plans } = useSelector((state) => state.drs)

  return (
    <ul className='flex flex-wrap justify-center gap-5 lg:gap-6'>
      {plans?.map((plan) => (
        <Plan key={plan.id} plan={plan} />
      ))}
    </ul>
  )
}

export default Plans
