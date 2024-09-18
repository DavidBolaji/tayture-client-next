import { useMatchedContet } from '@/Context/matchedCard/matched-card-context'
import { checkIsExpMatch } from '@/utils/helpers'
import React from 'react'
import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6'
import { IMatchedCardAppliedItem } from './MatchedCardAppliedItem'

const MatchedCardAppliedItemExp: React.FC<IMatchedCardAppliedItem> = ({
  match,
}) => {
  const { cur } = useMatchedContet()
  return (
    <div className="col-span-2">
      {checkIsExpMatch({
        exp: match.exp,
        job: cur.job.job_exp,
      }) ? (
        <div className="w-full flex justify-center">
          <FaCircleCheck color="green" size={20} />
        </div>
      ) : (
        <div className="flex w-full justify-center">
          <FaCircleXmark color={'red'} size={20} />
        </div>
      )}
    </div>
  )
}

export default MatchedCardAppliedItemExp
