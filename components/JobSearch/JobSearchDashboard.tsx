import React, { useEffect, useRef, useState } from 'react'
import { Empty, Input, message } from 'antd'
import { cn } from '@/utils/helpers'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Axios } from '@/request/request'
import { useGlobalContext } from '@/Context/store'
import { useRouter } from 'next/router'
import debounce from 'lodash/debounce'
import { Job } from '@prisma/client'
import Spinner from '../Spinner/Spinner'

interface JobSearchProps {
  className?: string
}

const JobSearchDashboard: React.FC<JobSearchProps> = ({ className }) => {
  const [val, setVal] = useState('')
  const [names, setNames] = useState<string[]>([])
  const queryClient = useQueryClient()
  const { setCount } = useGlobalContext()
  const router = useRouter()

  const { mutate: select } = useMutation({
    mutationFn: async (title: string) => {
      const req = await Axios.get(`/job?title=${title}`)
      return req.data
    },
    onSuccess: (res) => {
      queryClient.setQueryData(['activeJob'], res.job[0])
      queryClient.setQueryData(['jobs'], res.job)
      setCount((prev: number) => prev - 1)
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (title: string) => {
      const req = await Axios.get(`/job?title=${title}`)
      return req.data
    },
    onSuccess: (res) => {
      const jName = res.job.map((j: Job) => j.job_title)
      setNames(jName)
    },
  })

  useEffect(() => {
    if (router.query.find) {
      Axios.get(`/job/${router.query.find}`)
        .then((res) => {
          setVal(res.data.job.job_title)
          mutate(res.data.job.job_title)
        })
        .catch((err) => {
          message.error((err as Error).message)
        })
    }
  }, [router.query, mutate])

  useEffect(() => {
    if (val.length === 0) {
      Axios.get(`/job`)
        .then((res) => {
          queryClient.setQueryData(['activeJob'], res.data.job[0])
          queryClient.setQueryData(['jobs'], res.data.job)
        })
        .catch((err) => {
          message.error((err as Error).message)
        })
    }
  }, [val, queryClient, router.query.find])

  const debouncedSearch = useRef(
    debounce((value: string) => mutate(value), 500),
  ).current

  const handleSearch = (value: string) => {
    setVal(value)
    debouncedSearch(value)
  }

  return (
    <div className="w-full relative group">
      <div className={cn('w-full', className)}>
        <Input
          className="h-10 border-orange focus:border-orange focus:shadow-none"
          placeholder="Search for a job"
          value={val}
          onChange={(e) => handleSearch(e.target.value)}
          allowClear
        />
      </div>
      <div
        className={`w-full absolute ${
          !names.length && !isPending ? 'top-10' : 'top-10'
        } text-xs mt-1 bg-white hidden group-focus-within:block py-2 rounded-md space-y-1 max-h-[100px] overflow-auto no-s ${
          val && 'group-hover:block'
        } shadow-md z-[1001]`}
      >
        {isPending ? (
          <div className="w-full h-full flex items-center justify-center">
            <Spinner color="orange" />
          </div>
        ) : !names.length ? (
          <Empty className="scale-75" image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : val ? (
          names.map((name) => (
            <p
              key={name}
              className="cursor-pointer transition-colors duration-300 mx-2 p-2 hover:bg-[#fdfdfd] border-b"
              onClick={() => {
                setVal(name)
                select(name)
              }}
            >
              {name}
            </p>
          ))
        ) : (
          <Empty className="scale-75" image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </div>
    </div>
  )
}

export default JobSearchDashboard