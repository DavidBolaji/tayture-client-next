import { checkIsQualMatch } from '@/utils/helpers'
import React from 'react'
import { IMatchedCardAppliedItem } from './MatchedCardAppliedItem'
import { useMatchedContet } from '@/Context/matchedCard/matched-card-context'
import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6'

const MatchedCardAppliedItemQual: React.FC<IMatchedCardAppliedItem> = ({
  match,
}) => {
  const { cur } = useMatchedContet()
  return (
    <div className="col-span-2">
      {checkIsQualMatch({
        qual: match.qual,
        job: cur.job.job_qual,
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

export default MatchedCardAppliedItemQual
