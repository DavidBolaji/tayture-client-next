import { regularFont } from '@/assets/fonts/fonts'
import { Button, Tooltip } from 'antd'
import React, { FC } from 'react'

const CVComponent: FC<{
  name: string
  ext: string
  onClick?: () => void
}> = ({ name, ext, onClick }) => {
  return (
    <div
      className={`w-full grid grid-cols-12 h-20 border rounded-lg overflow-hidden ${regularFont.className}`}
    >
      <div
        className={`col-span-3 grid place-content-center ${
          ext === 'pdf' ? 'bg-error' : 'bg-blue-500'
        }`}
      >
        {ext.toUpperCase()}
      </div>
      <div className="col-span-9 flex items-center justify-between bg-white px-3">
        <div>
          <Tooltip title={name}>
            <h3 className="text-[12px] whitespace-nowrap text-ellipsis text-wrap overflow-hidden max-w-[100px]">{name}</h3>
          </Tooltip>
        </div>
        <Button type="link" className={regularFont.className} onClick={onClick}>
          View
        </Button>
      </div>
    </div>
  )
}

export default CVComponent
