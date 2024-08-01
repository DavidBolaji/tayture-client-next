import { useGlobalContext } from '@/Context/store'
import { IJobSchDb } from '@/pages/api/job/types'
import { IUser } from '@/pages/api/users/types'
import { useQueryClient } from '@tanstack/react-query'
import React from 'react'
import Button from '../Button/Button'
import { FaCheck } from 'react-icons/fa'

const BtnLanding:React.FC<{related?: boolean}> = ({related = false}) => {
  const queryClient = useQueryClient()
  const user = queryClient.getQueryData(['user']) as IUser
  const data = queryClient.getQueryData(['activeJob']) as IJobSchDb
  const data2 = queryClient.getQueryData(['relatedJob']) as IJobSchDb
  const curId = related ? data2?.job_id : data?.job_id

  const { setUI } = useGlobalContext()

  const handleShow = () => {
    queryClient.setQueryData(['isRelated'], () => related)
    setUI((prev) => {
      return {
        ...prev,
        applyModal: {
          ...prev.applyModal,
          visibility: !prev.applyModal?.visibility,
        },
      }
    })
  }
  const handleShow2 = () => {
    queryClient.setQueryData(['isRelated'], () => related)
    setUI((prev) => {
      return {
        ...prev,
        applyLandingModal: {
          ...prev.applyLandingModal,
          visibility: !prev.applyLandingModal?.visibility,
        },
      }
    })
  }

  return (
    <div className="my-[24px] ml-1">
      {user ? (
        user?.applied &&
        user?.applied.some((item) => item.jobId === curId) ? (
          <Button
            disabled
            render="dark"
            text={
              <>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-orange inline-block p-1">
                    <FaCheck color="#000" size={10} />
                  </span>
                  <span>Applied</span>
                </div>
              </>
            }
            bold={false}
          />
        ) : (
          <Button
            onClick={handleShow}
            render="light"
            text="Apply"
            bold={false}
            hover={true}
          />
        )
      ) : (
        <Button
          onClick={handleShow2}
          render="light"
          text="Apply"
          bold={false}
          hover={true}
        />
      )}
    </div>
  )
}

export default BtnLanding
