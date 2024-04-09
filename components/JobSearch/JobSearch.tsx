import { ConfigProvider, Input, message } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import Button from '../Button/Button'
import { cn } from '@/utils/helpers'
import { useMutation,  useQueryClient } from '@tanstack/react-query'
import { Axios } from '@/request/request'
import { useGlobalContext } from '@/Context/store'
import { useRouter } from 'next/router'
import { Select, Tag } from 'antd';
import type { SelectProps } from 'antd';

interface JobSearchProps {
  className?: string
}

type TagRender = SelectProps['tagRender']

const options: SelectProps['options'] = [
  { value: 'all', label: "All" },
  { value: 'teacher', label: "Teacher" },
  { value: 'admin', label: "Admin" },
];

const hashMap = {
  all: "gold",
  teacher: "lime",
  admin: "green"
}

const tagRender: TagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={hashMap[value as "admin" | "teacher" | "all"]}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginInlineEnd: 4 }}
    >
      {label}
    </Tag>
  );
};

const JobSearch: React.FC<JobSearchProps> = ({ className }) => {
  const [val, setVal] = useState('');
  const queryClient = useQueryClient();
  const {count, setCount} = useGlobalContext()
  const router = useRouter()

  const inputRef = useRef<HTMLButtonElement | null>(null)

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


  useEffect(() => {
    if(router.query.find) {
      Axios.get(`/job/${router.query.find}`).then((res) => {
        setVal(res.data.job.job_title)
       mutate(res.data.job.job_title)
      }).catch((err) => {
        message.error((err as Error).message)
      })
    }

  }, [router.query])

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
              ref={inputRef}
            />
             {/* <Select
              tagRender={tagRender}
              defaultValue={['gold', 'cyan']}
              style={{ width: '100%' }}
              options={options}
            /> */}
            
          </div>
        </div>
      </ConfigProvider>
    </div>
  )
}

export default JobSearch
