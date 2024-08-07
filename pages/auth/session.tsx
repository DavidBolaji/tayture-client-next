import React from 'react'
import AuthLayout from '@/components/layouts/AuthLayout'
import useSessionSchool from '@/hooks/useSessionSchool'

const Session = () => {
  useSessionSchool()
  return null
}

Session.getLayout = function getLayout(page: React.ReactNode) {
  return <AuthLayout>{page}</AuthLayout>
}

export default Session
