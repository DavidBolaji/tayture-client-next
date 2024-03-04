import React, { ReactNode } from 'react'
import { v4 as uuid } from 'uuid'

const ListComponent: React.FC<{
  title: string
  text: string | ReactNode
  col?: boolean
}> = ({ title, text, col }) => (
  <div className="flex items-center mb-[8px]">
    <div className={`h-2 w-2 rounded-full bg-orange ${col ? 'hidden' : ''}`} />
    <div className={`ml-1  ${col ? 'hidden' : ''}`}>{title}</div>
    <div
      key={uuid()}
      className={`text-[12px] text-ash_400 ml-2  ${col ? 'hidden' : ''}`}
    >
      {text}
    </div>
    <div className={` ${col ? ' flex' : 'hidden'}`}>
      <div>
        <div className="h-2 w-2 translate-y-2 rounded-full bg-orange" />
      </div>
      <div>
        <div className="ml-1">{title}:</div>
        <div key={uuid()} className="text-[12px] text-ash_400 ml-2">
          {text}
        </div>
      </div>
    </div>
  </div>
)

export default ListComponent
