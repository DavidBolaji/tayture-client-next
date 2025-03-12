import React, { useEffect, useRef, useState } from 'react'
import { Input, message } from 'antd'
import { cn } from '@/utils/helpers'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Axios } from '@/request/request'
import { useGlobalContext } from '@/Context/store'
import { useRouter } from 'next/router'
import debounce from 'lodash/debounce'
import { Job } from '@prisma/client'
import Spinner from '../Spinner/Spinner'
import { IJobSchDb } from '@/pages/api/job/types'
import useFilterModal from './hook/use-filter-modal'
import useFilterQuery from './hook/use-filter-query'
import { PiFaders } from 'react-icons/pi'

interface JobSearchProps {
  className?: string
}

const JobSearch: React.FC<JobSearchProps> = ({ className }) => {
  const [val, setVal] = useState('')
  const [names, setNames] = useState<string[]>([])
  const queryClient = useQueryClient()
  const { setOpen } = useFilterModal()
  const { filter, reset } = useFilterQuery()
  const { setCount } = useGlobalContext()
  const router = useRouter()

  const { mutate: select } = useMutation({
    mutationFn: async (title: string) => {
      const req = await Axios.get(
        `/job?title=${title}&location=${filter?.location || ''}&minPrice=${
          filter?.minPrice || ''
        }`,
      )
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
      const req = await Axios.get(
        `/job?title=${title}&location=${filter?.location || ''}&minPrice=${
          filter?.minPrice || ''
        }`,
      )
      return req.data
    },
    onSuccess: (res) => {
      const jName = res.job.map((j: Job) => j.job_title)
      setNames(jName)
    },
  })

  useEffect(() => {
    if (router.query.find) {
      Axios.get<{ job: IJobSchDb; relatedJob: IJobSchDb[] }>(
        `/job/${router.query.find}`,
      )
        .then((res) => {
          setVal(res.data.job.job_title)
          const t = setTimeout(() => {
            queryClient.setQueryData(['activeJob'], res.data.job)
            queryClient.setQueryData(['jobs'], [res.data.job])
            queryClient.setQueryData(['relatedJobs'], () => res.data.relatedJob)
            queryClient.setQueryData(
              ['relatedJob'],
              () => res.data.relatedJob[0],
            )
            clearTimeout(t)
          }, 2500)
        })
        .catch((err) => {
          message.error((err as Error).message)
        })
    }
  }, [router.query, queryClient])

  useEffect(() => {
    if (val.length === 0) {
      reset()
    }
  }, [val, queryClient, router.query.find])

  const debouncedSearch = useRef(
    debounce((value: string) => mutate(value), 500),
  ).current

  const handleSearch = (value: string) => {
    setVal(value)
    debouncedSearch(value)
  }

  const handleReset = () => {
    setVal('')
    queryClient.setQueryData(['relatedJobs'], () => [])
  }
  const divRef = useRef<HTMLDivElement | null>(null)

  return (
    <>
      <div className="w-full relative group" ref={divRef}>
        <div className={cn('w-full flex gap-2', className)}>
          <button
            onClick={setOpen}
            className="text-orange font-bold bg-white p-2.5 rounded-md
          h-10"
          >
            <PiFaders />
          </button>
          <Input
            className="h-10 border-orange focus:border-orange focus:shadow-none"
            placeholder="Search for a job by subject"
            value={val}
            onChange={(e) => handleSearch(e.target.value)}
            allowClear
          />
          <button
            onClick={handleReset}
            disabled={val.trim().length < 1}
            className={`text-xs whitespace-nowrap disabled:bg-[#f4c2a0] bg-orange p-2.5 rounded-lg transition-colors duration-300
        ${
          val.trim().length < 1
            ? 'cursor-not-allowed'
            : ' hover:bg-black hover:text-white'
        }
        `}
          >
            See All
          </button>
        </div>
        <div
          className={`w-full absolute ${
            !names.length && !isPending ? 'top-10' : 'top-10'
          } text-xs mt-1 bg-white hidden group-focus-within:block py-2 rounded-md space-y-1 max-h-[100px] overflow-auto no-s ${
            val && 'group-hover:block'
          } shadow-md`}
        >
          {isPending ? (
            <div className="w-full h-full flex items-center justify-center">
              <Spinner color="orange" />
            </div>
          ) : !names.length ? null : val ? (
            names.map((name) => (
              <>
                <p
                  key={name}
                  className="cursor-pointer transition-colors duration-300 mx-2 p-2 hover:bg-[#fdfdfd] border-b"
                  onClick={() => {
                    setVal(name)
                    select(name)
                    divRef.current?.focus()
                  }}
                >
                  {name}
                </p>
              </>
            ))
          ) : null}
        </div>
        <div className="mt-2 -top-10 py-2 px-1 absolute text-sm">
          {filter?.location && (
            <span className="mr-2">Location: {filter?.location}</span>
          )}
          {filter?.minPrice && (
            <span className="mr-2">Min Price: {filter?.minPrice}</span>
          )}
        </div>
      </div>
    </>
  )
}

export default JobSearch
