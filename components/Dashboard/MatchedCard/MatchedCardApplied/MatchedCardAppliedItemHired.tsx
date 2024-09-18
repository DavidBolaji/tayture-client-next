import { useMatchedContet } from '@/Context/matchedCard/matched-card-context'
import React, { useState } from 'react'
import { IMatchedCardAppliedItem } from './MatchedCardAppliedItem'
import { Switch } from 'antd'
import { StyledModal } from '../../ScheduledCard/ScheduledCard'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Axios } from '@/request/request'
import { useRouter } from 'next/router'
import { AxiosError } from 'axios'
import { useGlobalContext } from '@/Context/store'
import { regularFont } from '@/assets/fonts/fonts'
import { getAppliedJobUsers, sendRejectionMessage } from '@/lib/api/matched'
import { updateJob } from '@/lib/api/job'

const MatchedCardAppliedItemHired: React.FC<IMatchedCardAppliedItem> = ({
  match,
}) => {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()
  const { cur, isPending, setId, id } = useMatchedContet()
  const { setMessage, defaultSchool } = useGlobalContext()
  const router = useRouter()

  const handleClose = () => {
    setOpen(false)
  }

  const { mutate: hire, isPending: hirePending } = useMutation({
    mutationFn: async () => {
      return await Axios.post('/hired/create', {
        userId: id,
        jobId: router.query.jobId,
        role: cur.job.job_title,
        defaultSchool,
      })
    },
    onSuccess: async (res) => {
      /**
       * no of hire on job
       *
       * if equal
       * all applied except hiredlist, send rejection mail,
       * archieve job
       */

      const totalHire = +cur.job.job_no_hires
      const alreadyHired = res.data.job.job.hired.length
      console.log(totalHire)
      if (totalHire === alreadyHired) {
        await sendRejectionMessage({
          jobId: cur.job.job_id,
          user: res.data.job.job.hired,
        })
        await updateJob(cur.job.job_id)
      }

      const req = await getAppliedJobUsers(cur.job.job_id as string)

      queryClient.setQueryData(
        [`job/${cur.job.job_id}`],
        () => req.data.applied,
      )

      setOpen(false)
      setMessage(() => res.data.message)

      setId!('')
    },
    onError: (error) => {
      setMessage(
        () =>
          (error as AxiosError<{ error: string }>).response?.data?.error ||
          (error as Error).message,
      )
    },
  })

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="col-span-1 scale-90 text-center -translate-y-2 translate-x-2"
      >
        {!cur?.job?.status ? (
          <Switch disabled loading={hirePending} />
        ) : match.user.hired && match.user.hired.length > 0 ? (
          <Switch
            checked
            disabled
            style={{
              backgroundColor: '#ff7517',
            }}
          />
        ) : (
          <div className="relative">
            <Switch
              loading={isPending || hirePending}
              value={false}
              onClick={() => {
                setOpen(true)
                setId!(match.userId)
              }}
              className="bg-[#898a8b]"
              defaultValue={false}
            />
          </div>
        )}
      </div>
      <StyledModal
        open={open}
        onCancel={handleClose}
        okText="Yes"
        cancelText="No"
        onOk={() => {
          setOpen(false)
          hire()
        }}
      >
        <h3
          className={`font-[600] text-black_400 text-[18px] mb-4 ${regularFont.className}`}
        >
          🚫 Confirmation
        </h3>
        <p className={`text-[14px] ${regularFont.className}`}>
          Applicant has been hired?
        </p>
      </StyledModal>
    </>
  )
}

export default MatchedCardAppliedItemHired
