import React from 'react'
import { IMatchedCardAppliedItem } from './MatchedCardAppliedItem'
import { format } from 'date-fns'

const MatchedCardDate: React.FC<IMatchedCardAppliedItem> = ({ match }) => {
  return (
    <div className="col-span-2">
      <h3 className="mb-2 max-w-24 text-xs translate-x-14 -translate-y-0.5">
        {format(match.user.createdAt, 'do MMM, yyyy hh:mm:aa ')}
      </h3>
    </div>
  )
}

export default MatchedCardDate
