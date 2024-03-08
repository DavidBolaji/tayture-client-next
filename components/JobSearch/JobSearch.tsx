import { ConfigProvider, Input } from 'antd'
import React from 'react'
import Button from '../Button/Button'
import { cn } from '@/utils/helpers'

interface JobSearchProps {
  className?: string
}

const JobSearch: React.FC<JobSearchProps> = ({ className }) => {
  return (
    <div className="w-full ">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#da7431db',
            colorFillAlter: '#FF7517',
            colorIcon: 'black',
            colorInfoBorderHover: 'red',
          },
        }}
      >
        <div className={cn('flex gap-2', className)}>
          <div className="w-full">
            <Input
              className="h-10"
              placeholder="Search for a job"
            />
          </div>
          <div className="whitespace-nowrap">
            <Button
              render="light"
              // text="find"
              text={
                <span className="md:text-[16px] text-[12px]">
                  Find jobs
                </span>
              }
              hover={false}
              bold={false}
            />
          </div>
        </div>
      </ConfigProvider>
    </div>
  )
}

export default JobSearch
