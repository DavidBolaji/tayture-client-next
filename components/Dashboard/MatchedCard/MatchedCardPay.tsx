import Spinner from '@/components/Spinner/Spinner'
import { useMatchedContet } from '@/Context/matchedCard/matched-card-context'
import React from 'react'
import { FaMoneyBill } from 'react-icons/fa'
import MatchedCardAppliedItemPayment from './MatchedCardApplied/MatchedCardAppliedItemPayment'

interface IMatchedCardButton {
  status: boolean
}

const MatchedCardPayButton: React.FC<IMatchedCardButton> = ({ status }) => {
  const {
    cur,
    sufficientBalancePayment,
    inSufficientPayment,
    amt,
    transactionLoading,
  } = useMatchedContet()

  const handleClick = status
    ? () => console.log('object')
    : String(amt).trim().length > 0
    ? () => sufficientBalancePayment!()
    : () => inSufficientPayment!()

  return (
    <div className="sticky top-0 w-full z-20 bg-[#faf9f9] bottom-0 py-2 mb-2">
      <button
        disabled={status || !cur?.job?.active}
        onClick={handleClick}
        className=" bg-green-600 gap-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-1 rounded-md cursor-pointer right-2 flex items-center justify-center"
      >
        {transactionLoading ? <Spinner color="#fff" /> : <FaMoneyBill />}
        <span>{cur?.job?.status ? 'Paid' : 'Pay'}</span>
      </button>
      <MatchedCardAppliedItemPayment />
    </div>
  )
}

export default MatchedCardPayButton
