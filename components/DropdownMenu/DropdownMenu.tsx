import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { regularFont } from '@/assets/fonts/fonts'
import { useRouter } from 'next/router'

const dataNav = [
  {
    id: 'nav1',
    path: '/',
    title: 'Home',
  },
  {
    id: 'nav5',
    path: '/blog',
    title: 'Blog',
  },
  {
    id: 'nav2',
    path: '/jobs',
    title: 'Find a Job',
  },
  {
    id: 'nav7',
    path: '/post_landing',
    title: 'Post a Job',
  },
  // {
  //   id: 'nav5',
  //   path: '/buildcv',
  //   title: 'Build CV',
  // },
  {
    id: 'nav3',
    path: '/auth/login',
    title: 'Login',
  },
  {
    id: 'nav4',
    path: '/auth/register',
    title: 'Sign Up',
  },
]

const DropdownMenu: React.FC<{ open: boolean; handleClose: () => void }> = ({
  open,
  handleClose,
}) => {
  const router = useRouter()
  const handleClick = (path: string) => {
    handleClose()
    router.push(path)
  }
  return (
    <AnimatePresence mode={'wait'}>
      {open && (
        <motion.div
          initial={{
            width: '100%',
            top: -40,
            position: 'fixed',
            zIndex: 30,
            opacity: 0,
          }}
          animate={{
            width: '100%',
            top: 80,
            position: 'fixed',
            zIndex: 30,
            opacity: 1,
          }}
          exit={{
            width: '100%',
            top: -80,
            position: 'fixed',
            opacity: 0,
            zIndex: 30,
          }}
          className="w-full"
        >
          <div className="w-full text-center bg-black pb-5">
            {dataNav.map((nav) => (
              <p
                key={nav.id}
                id={nav.id}
                className="text-white text-[16px] mb-[24px]"
              >
                <button
                  onClick={() => handleClick(nav.path)}
                  className={`hover:text-orange text-white ${regularFont.className}`}
                >
                  {nav.title}
                </button>
              </p>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { DropdownMenu }
