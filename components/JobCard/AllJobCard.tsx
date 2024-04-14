import { regularFont } from '@/assets/fonts/fonts'
import { formatNumberToK, salaryOutput } from '@/utils/helpers'
import { Job } from '@prisma/client'
import {  Switch, Tag, message } from 'antd'
import React from 'react'
import { FaClock, FaShareAlt } from 'react-icons/fa'
import moment from 'moment'
import Link from 'next/link'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Axios } from '@/request/request'
import { useGlobalContext } from '@/Context/store'

interface IAllJobCard {
  job: Job[] | []
}

const AllJobCard: React.FC<IAllJobCard> = ({ job }) => {
  const queryClient = useQueryClient()
  const {setMessage} = useGlobalContext()
  const {mutate} = useMutation({
    mutationFn: async (active: boolean) => {
      return await Axios.put('/school/update/me', {active})
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ['school']
      })
      setMessage(() => res.data.message)
    }
  })
  const jobList = !job
    ? []
    : job.map((j: Job) => (
        <div
          key={j.job_id}
          className="md:col-span-4 col-span-12 bg-white gap-2 border hover:shadow rounded-md h-52 relative overflow-hidden"
        >
          <div
            className={`p-3 border-b flex justify-between ${regularFont.className}`}
          >
            <div>
              <div className="mb-1">{j.job_title}</div>
              <div
                className={`flex items-center gap-1 ${regularFont.className} text-xs`}
              >
                <span>
                  <FaClock />
                </span>
                <div className="text-[10px]">
                  {moment()
                    .date(new Date(j.createdAt).getDate())
                    .month(new Date(j.createdAt).getMonth())
                    .format('Do MMM')}
                </div>
              </div>
            </div>
            <Link href={`/dashboard/school/manage/${j.job_id}?default=2`}>
              View
            </Link>
          </div>
          <div className="pl-3 pt-1 space-y-4">
            <div className={`${regularFont.className} text-xs space-x-2`}>
              <span>Experience:</span>
              <Tag color="green" className={`${regularFont.className} text-xs`}>
                {j.job_exp} year&apos;s
              </Tag>
            </div>

            <div className={`${regularFont.className} text-xs space-x-2`}>
              <span>Qualification:</span>
              <Tag
                color="magenta"
                className={`${regularFont.className} text-xs`}
              >
                {j.job_qual}
              </Tag>
            </div>

            <div className={`${regularFont.className} text-xs space-x-2`}>
              <span>Resumption:</span>
              <Tag color="red" className={`${regularFont.className} text-xs`}>
                {moment()
                  .date(new Date(j.job_resumption).getDate())
                  .month(new Date(j.job_resumption).getMonth())
                  .format('Do MMM')}
              </Tag>
            </div>
          </div>
          <div
            onClick={() => {
              navigator.clipboard.writeText(
                `${process.env.NEXT_PUBLIC_FRONTEND_API}/find_job?find=${j.job_id}`,
              )
              message.success('Link copied to clipboard')
            }}
            className="absolute top-[67px] w-12 flex items-center justify-center h-[100px] right-0 bg-[#fafafa] cursor-pointer"
          >
            <FaShareAlt />
          </div>

          <div className="absolute bottom-0 border-t px-3 py-2 w-full flex items-center justify-between">
            <div>
              <div className={`${regularFont.className} text-xs `}>
                {formatNumberToK(
                  salaryOutput(j.job_min_sal, j.job_max_sal) as string,
                )}
              </div>
            </div>
            <div className={`space-x-1 ${regularFont.className} text-xs`}>
              {j.status && (
                <Switch
                  onClick={() => mutate(false)}
                  defaultChecked
                  checkedChildren={
                    <span
                      className={`${regularFont.className} text-[10px] block`}
                    >
                      OFF
                    </span>
                  }
                  unCheckedChildren={
                    <span
                      className={`${regularFont.className} block text-[10px]`}
                    >
                      ON
                    </span>
                  }
                  className="bg-[#8a8a8a]"
                />
              )}
              {!j.status && (
                <Switch
                onClick={() => mutate(true)}
                  checkedChildren={
                    <span
                      className={`${regularFont.className} text-[10px] block`}
                    >
                      OFF
                    </span>
                  }
                  unCheckedChildren={
                    <span
                      className={`${regularFont.className} text-[10px] block`}
                    >
                      ON
                    </span>
                  }
                  className="bg-[#8a8a8a]"
                />
              )}
            </div>
          </div>
        </div>
      ))
  return <div className="grid grid-cols-12">{jobList}</div>
}

export default AllJobCard
