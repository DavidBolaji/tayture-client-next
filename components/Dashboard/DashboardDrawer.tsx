import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

const dataNav = [
    {
      id: 'dnav1',
      path: '/dashboard',
      title: 'Home'
    },
    {
      id: 'dnav5',
      path: '/dashboard/jobs',
      title: 'Jobs'
    },
    {
      id: 'dnav2',
      path: '/dashboard/school',
      title: 'My School'
    },
    {
      id: 'dnav2',
      path: '/dashboard/admin',
      title: 'Admin'
    },
   
  ]

function DashboardDrawer({visible, isAdmin}: {visible: boolean, isAdmin: boolean}) {
 
  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          initial={{
            y: -400,
            width: '100%',
          }}
          animate={{
 
            y: 0,
            width: '100%',
           
          }}
          exit={{
            y: -400,
            width: '100%',
            // zIndex: -500,
          }}
          transition={{ duration: 0.3, ease: 'linear' }}
          className="w-full"
        >
          <div className="w-full text-center bg-black pb-5 text-white">
            {dataNav.map((nav) => (
            nav.path !== '/dashboard/admin'? <p key={nav.path} className="text-[20px]">
              <Link href={nav?.path} className="hover:text-orange text-white">
               {nav?.title}
              </Link>
            </p>: isAdmin && <p key={nav.path} className="text-[20px] text-white">
              <Link href={nav?.path} className="hover:text-orange text-white">
               {nav?.title}
              </Link>
            </p>

            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DashboardDrawer;
