import React from 'react'
import { IMatchedCardAppliedItem } from './MatchedCardAppliedItem'

const MatchedCardAppliedItemName: React.FC<IMatchedCardAppliedItem> = ({
  match,
}) => {
  return (
    <div className="col-span-1">
      <h3 className="mb-2">{match.user.fname}</h3>
    </div>
  )
}

export default MatchedCardAppliedItemName
