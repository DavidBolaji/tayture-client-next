import React from 'react'
import Button from '../Button/Button'
import { useQueryClient } from '@tanstack/react-query'
import { IUser } from '@/pages/api/users/types'
import { useGlobalContext } from '@/Context/store'
import { FaCheck } from 'react-icons/fa'
import { IJobSchDb } from '@/pages/api/job/types'

const BtnDashboard: React.FC = () => {
  const queryClient = useQueryClient()
  const user = queryClient.getQueryData(['user']) as IUser
  const data = queryClient.getQueryData(['activeJob']) as IJobSchDb
  const { setUI } = useGlobalContext()

  const handleShow = () => {
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
  return (
    <div className="my-[24px] ml-1">
      {user?.applied &&
      user?.applied.map((item) => item.jobId).includes(data.job_id) ? (
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
      )}
    </div>
  )
}

export default BtnDashboard
