import { ConfigProvider, Input } from 'antd'
import React, { useState } from 'react'
import Button from '../Button/Button'
import { cn } from '@/utils/helpers'
import { useMutation,  useQueryClient } from '@tanstack/react-query'
import { Axios } from '@/request/request'
import { useGlobalContext } from '@/Context/store'

interface JobSearchProps {
  className?: string
}

const JobSearch: React.FC<JobSearchProps> = ({ className }) => {
  const [val, setVal] = useState('');
  const queryClient = useQueryClient();
  const {count, setCount} = useGlobalContext()

  const {mutate, isPending} = useMutation({
   mutationFn: async (title: string) => {
    const req = await Axios.get(`/job?title=${title}`)
    return req.data
   },
   onSuccess: (res) => {
    queryClient.setQueryData(['activeJob'], res.job[0])
    queryClient.setQueryData(['jobs'], res.job)
    setCount(prev => prev - 1)
   }
  })

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
        <div className={cn('flex gap-2 left-0 sm:top-2 h-3 md:h-24 md:top-2 ml-2 sm:relative w-full sm:w-auto', className)}>
          <div className="w-full">
            <Input className="h-10" placeholder="Search for a job" value={val} onChange={(e) => setVal(e.target.value)} />
          </div>
          <div className="whitespace-nowrap mr-5">
            <Button
              render="light"
              onClick={() => mutate(val)}
              text={
                <span className="md:text-[16px] text-[12px]">Find jobs</span>
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
