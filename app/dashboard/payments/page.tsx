import { ButtonComp } from '@/components/ButtonComp'
import React from 'react'

const PaymentPage = () => {
  return (
    <div>
      <div className="flex  flex-row justify-between items-center gap-3 p-4">
        <h1 className="text-lg font-semibold">Payments</h1>
        <ButtonComp onClick={() => console.log('Button clicked!')}>Add Payment</ButtonComp>
      </div>
    </div>
  )
}

export default PaymentPage