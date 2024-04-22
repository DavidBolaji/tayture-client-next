import { GlobalContextProvider } from '@/Context/store'
import AuthLayout from '@/components/layouts/AuthLayout'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import HomeLayout from '@/components/layouts/HomeLayout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import HandleError from '@/components/HandleError'
import TanStackProvider from '@/components/providers/TanStackProviders'
import HandleAttention from '@/components/Modal/HandleAttention'
import ScrollToTop from '@/components/ScrollToTop'
import HandleApply from '@/components/Modal/HandleApply'
import HandleApplyLanding from '@/components/Modal/HandleApplyLanding'
import HandlePostLanding from '@/components/Modal/HandlePostLanding'
import { AnimatePresence, motion } from 'framer-motion'
import NextNProgress from 'nextjs-progressbar'
import HandleUpload from '@/components/Modal/HandleUpload'
import Whatsapp from '@/components/Whatsapp/Whatsapp'

const pages = [
  'Home',
  'Calculator',
  'FindJob',
  'Build',
  'Success',
  'FindJobTypePage',
  'PostLandingPage',
  'BuildPage',
  'One',
  'Blog',
]

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const pageName = Component.name || ''
  let layout

  if (pageName === 'Login' || pageName === 'Register') {
    layout = (
      <AuthLayout>
        <Component {...pageProps} />
      </AuthLayout>
    )
  } else if (pages.includes(pageName)) {
    layout = (
      <HomeLayout>
        <Component {...pageProps} />
      </HomeLayout>
    )
  } else if (pageName === 'Dashboard') {
    layout = (
      <DashboardLayout>
        <Component {...pageProps} />
      </DashboardLayout>
    )
  } else {
    layout = (
      <DashboardLayout>
        <Component {...pageProps} />
      </DashboardLayout>
    )
  }

  return (
    <TanStackProvider>
      <GlobalContextProvider>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: { type: 'spring' },
            }}
            exit={{
              opacity: 0,
            }}
          >
            <ScrollToTop />
            <NextNProgress color="#FF7517" />
            {layout}
            
              <Whatsapp />
            
            <HandleError />
            <HandleAttention />
            <HandleApply />
            <HandleApplyLanding />
            <HandlePostLanding />
            <HandleUpload />
          </motion.div>
        </AnimatePresence>
      </GlobalContextProvider>
    </TanStackProvider>
  )
}
