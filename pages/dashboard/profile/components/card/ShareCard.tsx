import { FC, useRef } from 'react'
import {
  FaDownload,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
} from 'react-icons/fa'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share'
import { Alert, Empty, Space } from 'antd'

import { MdOutlineError } from 'react-icons/md'
import * as htmlToImage from 'html-to-image'
import CardWrapper from '@/components/Dashboard/CardWrapper'

interface SharedCardProp {
  picture: string | null
  fname: string
  lname: string
}

const ShareCard: FC<SharedCardProp> = ({ picture, fname, lname }) => {
  const divRef = useRef<HTMLDivElement | null>(null)

  const id = picture?.split('/')[picture?.split('/').length - 1].split('.')[0]

  const url = `https://res.cloudinary.com/dhwlkhbet/image/upload/w_0.2/l_tayture:${id},c_thumb,g_face,r_max,w_170,h_170,z_0.5/fl_layer_apply,g_north_east,x_0.1,y_0.47/l_text:Arial_16_bold:${fname}%20${lname}/fl_layer_apply,g_south,y_50,x_100/TEMPLATE_NEW_rjkqk0.jpg`
  const shareUrl = `https://res.cloudinary.com/dhwlkhbet/image/upload/w_428,h_520/l_TEMPLATE_NEW_rjkqk0,w_430,h_410/fl_layer_apply,g_north/l_tayture:${id},c_thumb,g_face,r_max,w_162,h_150,z_0.5/fl_layer_apply,g_south_east,x_0.1,y_0.34/l_text:Karla_15_bold:${fname}%20${lname}/fl_layer_apply,g_north,y_357,x_100/Your_paragraph_text_kwf5bh.png`

  const handleDownload = () => {
    if (divRef) {
      htmlToImage
        .toPng(divRef.current!, { cacheBust: false })
        .then((dataUrl) => {
          const link = document.createElement('a')
          link.download = 'my-image-name.png'
          link.href = dataUrl
          link.click()
        })
        .catch((err: Error) => {
          console.log(err)
        })
    }
  }

  return (
    <CardWrapper
      key="SHARE"
      title={
        <Space direction="vertical">
          <span>Share</span>
          <div className="-translate-x-8 -mb-3 -mt-3 scale-90">
            <Alert
              type="error"
              showIcon
              message="update profile picture to see your meme"
              className="bg-transparent -translate-x-1 border-none text-[15px]"
              icon={
                <span className="inline-block mt-2 -translate-y-1">
                  <MdOutlineError color="#B3261E" />
                </span>
              }
            />
          </div>
        </Space>
      }
      onClick={() => {}}
      empty
    >
      {id ? (
        <div className="relative dsm:w-[400px] scale-95">
          <div className="relative mb-5" id="image" ref={divRef}>
            <img alt="share" className="w-[400px]" src={url} />
          </div>
          <div className="sharethis-inline-share-buttons" />
          <Space.Compact className="gap-3">
            <FacebookShareButton
              url={`${process.env.NEXT_PUBLIC_FRONTEND_API}/dashboard/profile`}
              quote="Tayture offers me access to multiple opportunities as an educator to learn more"
              hashtag="#education#tayture"
            >
              <div className="border cursor-pointer rounded-md px-5 bg-[#4267b2] py-2 flex items-center justify-center ">
                <FaFacebook color="#fff" />
              </div>
            </FacebookShareButton>

            <LinkedinShareButton
              url={shareUrl}
              title="Tayture offers me access to multiple opportunities as an educator to learn more"
            >
              <div className="border cursor-pointer rounded-md px-5 py-2 flex items-center justify-center bg-[#0077b5]">
                <FaLinkedin color="#fff" />
              </div>
            </LinkedinShareButton>

            <TwitterShareButton
              url={shareUrl}
              title={`Tayture offers me access to multiple opportunities as an educator to learn more.
              `}
            >
              <div className="border cursor-pointer rounded-md px-5 py-2 flex items-center justify-center bg-black">
                <FaTwitter color="#fff" />
              </div>
            </TwitterShareButton>

            <WhatsappShareButton
              url={shareUrl}
              title={`Tayture offers me access to multiple opportunities as an educator to learn more visit https://tayture.com`}
            >
              <div className="border cursor-pointer rounded-md px-5 py-2 flex items-center justify-center bg-[#0d963e]">
                <FaWhatsapp color="#fff" />
              </div>
            </WhatsappShareButton>
            <div
              onClick={handleDownload}
              className="border cursor-pointer rounded-md px-5 py-2 flex items-center justify-center bg-transparent"
            >
              <FaDownload />
            </div>
          </Space.Compact>
        </div>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </CardWrapper>
  )
}

export default ShareCard
