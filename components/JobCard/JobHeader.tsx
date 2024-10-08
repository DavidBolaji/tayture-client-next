import React, { useState } from 'react'
import { FaEllipsisH, FaClock } from 'react-icons/fa'
import Link from 'next/link'
import moment from 'moment'
import { motion } from 'framer-motion' // Import framer-motion
import { Job } from '@prisma/client'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'

interface IJobHeader {
  job: Job
  access: boolean
}

const JobHeader: React.FC<IJobHeader> = ({ job, access }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const queryClient = useQueryClient()
  const router = useRouter()

  // Toggle dropdown visibility
  const handleDropdownToggle = () => {
    setDropdownVisible((prev) => !prev)
  }

  // Dropdown animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  }

  return (
    <div className={`p-3 border-b flex justify-between items-center relative`}>
      <div>
        <div className="mb-1">{job.job_title}</div>
        <div className={`flex items-center gap-1 text-xs`}>
          <FaClock />
          <div className="text-[10px]">
            {moment(job.createdAt).format('Do MMM')}
          </div>
        </div>
      </div>

      {/* Ellipses Icon for Dropdown */}
      <div className="relative">
        <FaEllipsisH
          className="cursor-pointer"
          onClick={handleDropdownToggle}
        />
        {/* Animate dropdown with framer-motion */}
        {dropdownVisible && (
          <motion.div
            className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-md z-10"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            transition={{ duration: 0.2 }} // Adjust duration for smoothness
          >
            <ul className="text-xs">
              <li className="p-2 hover:bg-gray-100 cursor-pointer">
                <Link href={`/dashboard/school/manage/${job.job_id}?default=2`}>
                  View
                </Link>
              </li>
              <li className="p-2 hover:bg-gray-100 cursor-pointer">
                <button
                  onClick={() => {
                    queryClient.setQueryData(['edit_job'], job)
                    router.push(`/dashboard/school/post?edit=1`)
                  }}
                >
                  Edit
                </button>
              </li>
              <li className="p-2 hover:bg-gray-100 cursor-pointer">
                <button
                  onClick={() => {
                    queryClient.setQueryData(['edit_job'], job)
                    router.push(`/dashboard/school/post?duplicate=1`)
                  }}
                >
                  Duplicate
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default JobHeader
