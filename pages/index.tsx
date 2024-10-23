import { Footer } from '@/components/Footer'
import Empower from './sections/Empower/Empower'
import Engage from './sections/Engage/Engage'
import Faq from './sections/FAQ/Faq'
import Hero from './sections/Hero/Hero'
import Hiring from './sections/Hiring/Hiring'
import Learnig from './sections/Learning/Learnig'
import Need from './sections/Need/Need'
import Question from './sections/Question/Question'
import Risk from './sections/Risk/Risk'
import Transform from './sections/Transform/Transform'
import HomeLayout from '@/components/layouts/HomeLayout'
import Meta from './dashboard/profile/components/Meta'
import { Images } from '@/assets'
import HomeCv from './sections/HomeCv/HomeCv'

const Home = () => {
  return (
    <>
    <Meta
       imageUrl={Images.Logo as unknown as string}
       title={'Tayture'}
       desc={
         'Hiring, Training and Community for K-12 schools, teachers and parents'
       }
     />
    <div className="h-[90vh] overflow-y-scroll no-s">
      <Hero />
      <Learnig />
      <Hiring />
      <HomeCv />
      <Question />
      <Transform />
      <Empower />
      <Engage />
      <Need />
      <Risk />
      <Faq />
      <Footer />
    </div>
    </>
  )
}

Home.getLayout = function getLayout(page: React.ReactNode) {
  return <HomeLayout>{page}</HomeLayout>
}
export default Home
