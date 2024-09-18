import { regularFont } from '@/assets/fonts/fonts'
import { Alert } from 'antd'
import React from 'react'
import { MdOutlineError } from 'react-icons/md'

interface IMatchedCardAlert {
  status: boolean
}

const MatchedCardAlert: React.FC<IMatchedCardAlert> = ({ status }) => {
  return status ? ( // paid
    <Alert
      type="success"
      showIcon
      message={
        <p className={`text-[12px] ${regularFont.className}`}>
          You have already paid for this job. Click the schedule button to
          invite candidate for interview and view invited candidate on interview
          tab
        </p>
      }
      className="bg-transparent -translate-x-1 -translate-y-3 border-none text-[15px] -mb-2"
    />
  ) : (
    <Alert
      type="error"
      showIcon
      message={
        <p className={`text-[12px] ${regularFont.className}`}>
          Click the pay button and make payment in order to gain access to
          scheduling applicants for interview.
        </p>
      }
      className="-translate-x-1 -translate-y-3 border-none text-[15px] -mb-2"
      icon={
        <span className="inline-block mt-2 -translate-y-1">
          <MdOutlineError color="#B3261E" />
        </span>
      }
    />
  )
}

export default MatchedCardAlert
