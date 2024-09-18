import ListComponent from '@/components/ListComponent'
import React from 'react'
import { IMatchedCardAppliedItem } from './MatchedCardAppliedItem'
import BlurComponent from '@/components/BlurComponent'
import { useMatchedContet } from '@/Context/matchedCard/matched-card-context'
import Link from 'next/link'
import CVComponent from '@/components/CVComponent'
import { checkFileExtension } from '@/utils/helpers'
import { Alert } from 'antd'
import { useRouter } from 'next/router'

const MatchedCardAppliedItemDetail: React.FC<IMatchedCardAppliedItem> = ({
  match,
}) => {
  const { cur, sufficientBalancePayment, inSufficientPayment, amt, jobId } = useMatchedContet();
  const router = useRouter()
  const redirect = () => router.push(`/dashboard/school/manage/${jobId}?default=3`)

  
  const handleClick = cur?.job?.status
    ? () => console.log('object')
    : String(amt).trim().length > 0
    ? () => sufficientBalancePayment!()
    : () => inSufficientPayment!()
  
  return (
    <div className="col-span-3">
      <ListComponent
        key="l9"
        title="Experience length"
        text={`${match.exp} years`}
      />
      <ListComponent key="l10" title="Qualification" text={match.qual} />
      {!cur.job?.status ? (
        <BlurComponent
          redirect={redirect}
          pay={handleClick}
          status={cur?.job?.status}
        />
      ) : match?.cv ? (
        <Link className="text-black" href={`${match?.cv}`} target="_blank">
          <CVComponent
            ext={checkFileExtension(match?.cv)}
            name={match?.cv.split('/')[match?.cv.split('/').length - 1]}
          />
        </Link>
      ) : (
        <Alert showIcon message={'User has not uploaded cv'} type="info" />
      )}
    </div>
  )
}

export default MatchedCardAppliedItemDetail
