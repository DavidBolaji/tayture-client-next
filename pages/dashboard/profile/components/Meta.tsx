import Head from 'next/head'
import { FC } from 'react'

interface MetaProps {
  imageUrl: string | null
  title: string
  desc: string
}

const Meta: FC<MetaProps> = ({ imageUrl, title, desc }) => {
  return (
    <Head>
      {/* <title>{title}</title> */}
      <title>
        Best Teacher Hiring Platform in Nigeria | Hire Verified Tutors
      </title>
      <meta
        name="description"
        content="Find and hire qualified teachers in Nigeria. Our platform connects schools and parents with professional educators for full-time or part-time jobs."
      />
      <meta
        name="keywords"
        content="teacher hiring platform Nigeria, hire tutors, find teachers, teaching jobs Nigeria, verified educators"
      />
      <meta name="description" content={desc} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      {imageUrl && (
        <>
          <meta property="og:image" content={imageUrl} />
          <meta property="twitter:image" content={imageUrl} />
        </>
      )}
    </Head>
  )
}

export default Meta
