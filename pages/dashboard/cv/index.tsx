import { Images } from '@/assets'
import { boldFont, regularFont } from '@/assets/fonts/fonts'
import CVList from '@/components/cv/CVList'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import Wrapper from '@/components/Wrapper/Wrapper'
import { Divider } from 'antd'
import Head from 'next/head'

const BuildPage = () => {
  return (
    <div
      className={`${regularFont.className} pt-16 text-center h-[90vh] overflow-x-auto`}
    >
      <Head>
        <title>Download CV | Professional Resume</title>
        <meta
          name="description"
          content="Create your Cv so others can learn more about my professional experience, skills, and accomplishments. Follow the link to access and download your own CV."
        />
        <meta
          name="keywords"
          content="CV, resume, professional, experience, skills, download CV, download resume, career, job application"
        />
        <meta name="author" content="Your Name" />
        <meta
          property="og:title"
          content="Download CV | Professional Resume"
        />
        <meta
          property="og:description"
          content="Access and download professional CV, showcasing your career journey, skills, and qualifications. Follow the link to get yours."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tayture.com/dashboard/cv" />
        <meta
          property="og:image"
          content={Images.Logo as unknown as string}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Download CV | Professional Resume"
        />
        <meta
          name="twitter:description"
          content="Create your Cv so others can learn more about your career journey, skills, and qualifications. Access the link to download yours too."
        />
        <meta
          name="twitter:image"
          content={Images.Logo as unknown as string}
        />
      </Head>
      <Wrapper>
        <h1
          className={`text-center text-3xl tracking-wider leading-[38px] mb-4 ${boldFont.className}`}
        >
          Choose your favorite template design
        </h1>
        <Divider>
          <span className="text-xl font-semibold">TEMPLATES</span>
        </Divider>

        {/* React Slick Carousel */}
        <CVList />
      </Wrapper>
    </div>
  )
}

BuildPage.getLayout = function getLayout(page: React.ReactNode) {
  return <DashboardLayout>{page}</DashboardLayout>
}


export default BuildPage
