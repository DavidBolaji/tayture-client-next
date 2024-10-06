import { useMatchedContet } from '@/Context/matchedCard/matched-card-context'
import React from 'react'
import { IMatchedCardAppliedItem } from './MatchedCardAppliedItem'
import { Switch } from 'antd'

const MatchedCardAppliedItemHired: React.FC<IMatchedCardAppliedItem> = ({
  match,
}) => {
 
  const { cur, isPending, setId, setOpen, hirePending} = useMatchedContet()

  return (
    <>
      <div
        onClick={() => {
          setOpen!(true)
        }}
        className="col-span-1 scale-90 text-center -translate-y-2 translate-x-2"
      >
        {!cur?.job?.status ? (
          <Switch disabled loading={hirePending} />
        ) : match.user.hired && match.user.hired.length > 0 ? (
          <Switch
            checked
            disabled
            style={{
              backgroundColor: '#ff7517',
            }}
          />
        ) : (
          <div className="relative">
            <Switch
              loading={isPending || hirePending}
              value={false}
              onClick={() => {
                setOpen!(true)
                setId!(match.userId)
              }}
              className="bg-[#898a8b]"
              defaultValue={false}
            />
          </div>
        )}
    
      </div>
    </>
  )
}

export default MatchedCardAppliedItemHired
