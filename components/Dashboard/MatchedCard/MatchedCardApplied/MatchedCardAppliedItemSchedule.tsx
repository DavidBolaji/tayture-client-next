import { useMatchedContet } from '@/Context/matchedCard/matched-card-context'
import React, { useCallback } from 'react'
import { IMatchedCardAppliedItem } from './MatchedCardAppliedItem'
import { AMOUNT_PER_HIRE } from '@/utils/helpers'
import HandleSchedule from '@/components/HandleSchedule'
import { useGlobalContext } from '@/Context/store'

const MatchedCardAppliedItemSchedule: React.FC<IMatchedCardAppliedItem> = ({
  match,
}) => {
  const { cur, hasBeenPaidfor, isScheduled, isLeft, wb, amountFinal, setAmt } =
    useMatchedContet()
  const { setUI, ui } = useGlobalContext()

  const hasBeenScheduled = cur.job.schedule
    .map((e: any) => e.user.id)
    .includes(match.user.id)

  const disabled =
    !cur?.job?.status ||
    (cur?.job?.schedule &&
      cur?.job?.schedule.map((e: any) => e.user.id).includes(match.user.id)) ||
    (match.user.hired && match.user.hired.length > 0)

  const handleClick = useCallback(() => {
    if (hasBeenPaidfor! > isScheduled! || isLeft === 0) {
      setUI((prev) => {
        return {
          ...prev,
          scheduleModal: {
            data: {
              ...prev.scheduleModal?.data,
              fname: match.user.fname,
              email: match.user.email,
              id: match.user.id,
            },
            visibility: true,
          },
        }
      })
    } else {
      setAmt!(Math.abs(wb! - amountFinal! + AMOUNT_PER_HIRE * hasBeenPaidfor!))
      /** Display modal  */
      setUI((prev) => ({
        ...prev,
        paymentModal: {
          ...prev.paymentModal,
          visibility: true,
        },
      }))
    }
  }, [])

  return (
    <>
      <div className="col-span-1 text-center ml-auto">
        {cur.job && (
          <button
            disabled={disabled}
            onClick={handleClick}
            className="gap-2 disabled:bg-[#FFA466] bg-orange text-black px-5 py-1 rounded-md cursor-pointer  flex items-center justify-center mb-3"
          >
            <div className="flex items-center gap-2">
              <span>{hasBeenScheduled ? 'Scheduled' : 'Schedule'}</span>
            </div>
          </button>
        )}
      </div>
      <HandleSchedule status={'create'} />
    </>
  )
}

export default MatchedCardAppliedItemSchedule
