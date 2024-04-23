import { regularFont } from '@/assets/fonts/fonts'
import SchoolAnalytics from '@/components/Dashboard/SchoolAnalytics/SchoolAnalytics'
import SchoolCard from '@/components/Dashboard/SchoolCard/SchoolCard'
import WalletCard2 from '@/components/Dashboard/WalletCard2'
// import WalletCard from '@/components/Dashboard/WalletCard'
import PricingCard from '@/components/PricingCard/PricingCard'
import useTransaction from '@/hooks/useTransaction'
import { getUser } from '@/lib/api/user'
import { School } from '@prisma/client'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Grid, Table } from 'antd'
import Link from 'next/link'
import React from 'react'
const { useBreakpoint } = Grid

const SchoolPage = () => {
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const req = await getUser()
      return req.data.user
    },
  })
  const queryClient = useQueryClient();
  const school = queryClient.getQueryData(['school']) as School | undefined

  /**check if path is defined */
  const pathExist = user?.path ? true : false

  /**
   * check if is school admin if
   * yes -> allow card redirect page
   * No -> prompt to become admin
   */
  let isSchAdmin =
    pathExist &&
    (JSON.parse(user!.path?.replace("'", '')!) as unknown as string[]).includes(
      'school admin',
    )
   const {limitTransaction, columns2, isPending} = useTransaction()
  const screen = useBreakpoint()
  return (
    <div>
       {typeof school !== "undefined" &&<h3
      className={`${regularFont.className} text-black md:text-[32px] font-[600] text-[20px] mb-2`}
    >
      {school?.sch_name}
    </h3>}
      <div className="grid grid-cols-10 gap-4 mb-3">
        <div className="md:col-span-5 col-span-10">
          <WalletCard2 />
        </div>
        <div className="md:col-span-5 h-[242px] md:mt-0 -mt-3 md:mb-0 mb-3 rounded-2xl p-3 bg-white col-span-10">
          <Table
            rowKey="id"
            // scroll={{ x: 700 }}
            dataSource={limitTransaction}
            columns={columns2}
            loading={isPending}
            pagination={false}
            size='small'
          />
          <div className='w-full pr-2 flex justify-end mt-1'>
          <Link href={'/dashboard/school/transaction'}>
            View all
          </Link>

          </div>
        </div>
      </div>
      <PricingCard />
      <SchoolCard isSchAdmin={isSchAdmin} screen={screen} />
      <SchoolAnalytics />
    </div>
  )
}

export default SchoolPage
