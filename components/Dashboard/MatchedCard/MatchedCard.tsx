'use client'
import { regularFont } from '@/assets/fonts/fonts'
import MatchedCardAlert from './MatchedCardAlert'
import { MatchedContextProvider } from '@/Context/matchedCard/matched-card-context'
import MatchedCardTableTitle from './MatchedCardTableTitle'
import MatchedCardAppliedItem from './MatchedCardApplied/MatchedCardAppliedItem'
import MatchedCardPayButton from './MatchedCardPay'

interface MatchedCardProps {
  params: { jobId: string }
  loading: boolean
  matchedJob: any
}

const MatchedCard: React.FC<MatchedCardProps> = ({
  params,
  matchedJob,
  loading,
}) => {
  const { jobId } = params

  return (
    <div className={`${regularFont.className} h-[400px] no-s mr-10`}>
      <MatchedContextProvider cur={matchedJob} jobId={jobId}>
        <div className="min-w-[900px]">
          <MatchedCardAlert status={matchedJob?.job?.status} />
          <MatchedCardPayButton  status={matchedJob?.job?.status} />
          <MatchedCardTableTitle />
          <div className=" pb-32">
            <div className="border bord border-b-0">
              {!loading &&
                matchedJob?.applied.length > 0 &&
                matchedJob?.applied.map((match: any) => (
                 <MatchedCardAppliedItem key={match.id} match={match} />
                ))}
            </div>
          </div>
        </div>
      </MatchedContextProvider>
    
    </div>
  )
}

export default MatchedCard
