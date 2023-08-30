import Plan from './Plan'

const Plans = ({ plans }) => {
  return (
    <ul className='w-full flex flex-col gap-2 mt-16 mb-10'>
      {plans?.map((plan) => (
        <Plan key={plan.id} plan={plan} />
      ))}
    </ul>
  )
}

export default Plans
