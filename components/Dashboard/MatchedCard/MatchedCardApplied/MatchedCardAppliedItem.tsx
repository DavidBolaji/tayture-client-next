import { useMatchedContet } from '@/Context/matchedCard/matched-card-context'
import { message } from 'antd'
import React from 'react'
import MatchedCardAppliedItemName from './MatchedCardAppliedItemName'
import MatchedCardAppliedItemDetail from './MatchedCardAppliedItemDetail'
import MatchedCardAppliedItemExp from './MatchedCardAppliedItemExp'
import MatchedCardAppliedItemQual from './MatchedCardAppliedItemQual'
import MatchedCardAppliedItemLoc from './MatchedCardAppliedItemLoc'
import MatchedCardAppliedItemSchedule from './MatchedCardAppliedItemSchedule'
import MatchedCardAppliedItemHired from './MatchedCardAppliedItemHired'
import { useQueryClient } from '@tanstack/react-query'
import { User } from '@prisma/client'
import MatchedCardAppliedItemRating from './MatchedCardAppliedItemRating'
import MatchedCardDate from './MatchedCardDate'

export interface IMatchedCardAppliedItem {
  match: any
}

const MatchedCardAppliedItem: React.FC<IMatchedCardAppliedItem> = ({
  match,
}) => {
  const { cur } = useMatchedContet()
  const queryClient = useQueryClient()
  const user = queryClient.getQueryData(['user']) as User
  return (
    <div className="relative">
      {!cur.job.active && (
        <div
          onClick={() => message.info('Job is not active')}
          className="h-full w-full opacity-5 bg-black absolute bottom-0 z-[1000]"
        ></div>
      )}
      <div className="grid grid-cols-12 border-b p-[24px] hover:bg-slate-50 hover:cursor-pointer transition-colors duration-300 relative">
        <MatchedCardAppliedItemName match={match} />
        <MatchedCardAppliedItemDetail match={match} />
        <MatchedCardAppliedItemExp match={match} />
        <MatchedCardAppliedItemQual match={match} />
        <MatchedCardAppliedItemLoc match={match} />
        <MatchedCardAppliedItemSchedule match={match} />
        <MatchedCardDate match={match} />
        <MatchedCardAppliedItemHired match={match} />

        {user?.role && (
          <div className="text-lg absolute -bottom-10 right-8 z-10">
            <MatchedCardAppliedItemRating match={match} />
          </div>
        )}
      </div>
    </div>
  )
}

export default MatchedCardAppliedItem
