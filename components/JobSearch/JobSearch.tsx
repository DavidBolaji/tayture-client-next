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
        <div className={cn('flex gap-x-3', className)}>
          <div className="md:w-2/4">
            <Input
              size="large"
              className="w-full"
              placeholder="Search for a job"
            />
          </div>
          <div className="">
            <Button
              render="light"
              // text="find"
              text={
                <span className="h-full w-full flex whitespace-nowrap">
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
