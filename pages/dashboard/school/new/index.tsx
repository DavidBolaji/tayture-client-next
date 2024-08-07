'use client'
import { useGlobalContext } from '@/Context/store'
import { regularFont } from '@/assets/fonts/fonts'
import AddSchool from '@/components/pagez/AddSchool'
import EditSchool from '@/components/pagez/EditSchool'
import { getUserSchool, getUserSchoolAdmin } from '@/lib/api/school'
import { ISchDb } from '@/pages/api/school/types'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const Heading: React.FC<{ sch: ISchDb; show: boolean }> = ({ sch, show }) => (
  <div className={regularFont.className}>
    <h3 className="md:text-[24px] text-[20px] text-center font-[600] text-black_400">
      {sch && Object.keys(sch).length > 0 ? 'Update School' : 'Add a school'}
    </h3>
    {show && (
      <p className="text-center text-ash_400 md:text-[16px] text-[12px] max-w-[387px] mx-auto mb-[40px]">
        You haven’t posted a job before, so you’ll have to add your school
        information
      </p>
    )}
  </div>
)

const AddSchoolPage = () => {
  const { defaultSchool } = useGlobalContext();
  const router = useRouter()
  const queryClient = useQueryClient();
  const permission = queryClient.getQueryData(['permission'])
  const permissionGranted = permission !== 'limited'
  const { data: school } = useQuery({
    queryKey: ['school'],
    queryFn: async () => {
      if(permissionGranted) {
        const req = await getUserSchool()
        return req.data.school[defaultSchool]
      } else {
        const req = await getUserSchoolAdmin()
        return req.data.school[defaultSchool]
      }
    },
  })

  const post_job = router.query.post_job
  /** No school and post job is clcked -> Add school page */
  const addFlow = !school && post_job === '1'
  /** No school and add school is clicked -> Add school page */
  const addFlow2 = !school && !post_job
  /** If school and post job clicked -> post job page*/
  const redirectFlow = school && post_job === '1'
  /** if school and add school clicked -> redirect to edit school page  */
  const editFlow = school && post_job !== '1'

  useEffect(() => {
    if (redirectFlow) {
      router.push('/dashboard/school/post')
    }
  }, [])

  return (
    <div className="flex items-center justify-center flex-col max-w-[648px] bg-white mx-auto md:px-[60px] px-5 py-[40px]">
      <Heading sch={school} show={addFlow} />
      {editFlow && <EditSchool />}
      {(addFlow || addFlow2) && <AddSchool />}
    </div>
  )
}

export default AddSchoolPage
