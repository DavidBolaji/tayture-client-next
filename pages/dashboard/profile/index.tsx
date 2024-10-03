import { Axios } from '@/request/request'
import {
  Education,
  Profile,
  Skills,
  Summary,
  User,
  WorkHistory,
  WorkRole,
} from '@prisma/client'
import React from 'react'
import { parseCookies } from 'nookies'
import UserCard from './components/card/UserCard'
import ShareCard from './components/card/ShareCard'
import PersonalInformationCard from './components/card/PersonalInformationCard'
import EducationCard from './components/card/EducationCard'
import ExperienceCard from './components/card/ExperienceCard'
import SkillCard from './components/card/SkillCard'
import Meta from './components/Meta'

export default function Page({
  profile,
}: {
  profile: User & { profile: Profile } & { summary: Summary } & {
    education: Education[]
  } & {
    work: (WorkHistory & { roles: WorkRole[] })[]
  } & {
    skills: Skills[]
  }
}) {
  
  return (
    <>
      <Meta
        imageUrl={profile?.profile?.picture}
        title={`${profile.fname}'s Page`}
        desc="Tayture offers me access to multiple opportunities as an educator to learn more"
      />
      <div className="pb-20">
        <UserCard
          fname={profile.fname}
          lname={profile.lname}
          picture={profile?.profile?.picture}
          summary={profile?.summary?.text}
          available={profile?.profile?.available}
        />
        <ShareCard
          fname={profile.fname}
          lname={profile.lname}
          picture={profile?.profile?.picture}
        />
        <PersonalInformationCard
          email={profile.email}
          phone={profile.phone}
          picture={profile?.profile?.picture}
          address={profile?.profile?.address}
          country={profile?.profile?.country}
          state={profile?.profile?.state}
          city={profile?.profile?.city}
          lga={profile?.profile?.lga}
          workplace={profile?.profile?.workplace}
        />
        <EducationCard education={profile.education} />
        <ExperienceCard experience={profile.work} />
        <SkillCard skills={profile.skills} />
      </div>
    </>
  )
}

export const getServerSideProps = async (ctx: any) => {
  const cookies = parseCookies(ctx)

  const token = cookies.token

  const res = await Axios.get('/users/profile', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const profile = res.data.profile

  return { props: { profile } }
}


  // const token = cookies.token

  // if (!token || !jwt.verify(token, process.env.NEXT_PUBLIC_NEXTAUTH_SECRET!)) {
  //   return {
  //     redirect: {
  //       destination: '/auth/login',
  //       permanent: false,
  //     },
  //   }
  // }