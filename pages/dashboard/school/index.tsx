import SchoolAnalytics from '@/components/Dashboard/SchoolAnalytics/SchoolAnalytics'
import SchoolCard from '@/components/Dashboard/SchoolCard/SchoolCard'
import WalletCard from '@/components/Dashboard/WalletCard'
import PricingCard from '@/components/PricingCard/PricingCard'
import { getUser } from '@/lib/api/user'
import { useQuery } from '@tanstack/react-query'
import { Grid } from 'antd'
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

  const screen = useBreakpoint()
  return (
    <div>
      <WalletCard />
      <PricingCard />
      <SchoolCard isSchAdmin={isSchAdmin} screen={screen} />
      <SchoolAnalytics />
    </div>
  )
}

export default SchoolPage
