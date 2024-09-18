import { useMatchedContet } from '@/Context/matchedCard/matched-card-context'
import React from 'react'
import { IMatchedCardAppliedItem } from './MatchedCardAppliedItem'
import { checkIsLocMatch } from '@/utils/helpers'
import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6'

const MatchedCardAppliedItemLoc: React.FC<IMatchedCardAppliedItem> = ({
  match,
}) => {
  const { cur } = useMatchedContet()
  return (
    <div className="col-span-1">
      {checkIsLocMatch({
        userLoc: match.user?.profile,
        jobLoc: cur.job.school,
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

export default MatchedCardAppliedItemLoc
