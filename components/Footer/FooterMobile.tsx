'use client'
import { Col, Grid, Row } from 'antd'
import Wrapper from '../Wrapper/Wrapper'
import { Icons, Images } from '@/assets'
import Link from 'next/link'
import Image from 'next/image'

const { useBreakpoint } = Grid
function FooterMobile() {
  const screen = useBreakpoint()
  return (
    <div className="bg-black_400 xl:h-[25rem] relative overflow-hidden">
      <Wrapper>
        <Row className="flex items-center justify-between xl:mb-[8.72rem]">
          <Col span={12} className="relative z-10">
            <Icons.TaytureLogo
              width={screen.lg ? '' : '90'}
              height={screen.lg ? '' : '90'}
            />
          </Col>
        </Row>
        <p className="text-white text-[15px]">
          Tayture is an innovative platform designed to support the different
          players in the field of education, with a focus on teachers, school
          administrator, and parents. It provides resources, tools, personalized
          support, and a community for enhanced teaching and learning
          experiences.
        </p>
        <hr className="pb-5 relative z-10 text-white opacity-[0.05]" />

        <Row>
          <Col
            xs={24}
            sm={24}
            md={12}
            className="text-white relative xl:text-[1rem] leading-[1.5rem] z-10 text-[16px] opacity-50"
          >
            © {new Date().getFullYear()} TAYTURE. All rights reserved.
          </Col>
        </Row>
        <Row>
          <Col
            xs={24}
            sm={24}
            md={12}
            className="text-white relative xl:text-[1rem] leading-[1.5rem] mt-3 z-10 text-[16px] opacity-50"
          >
            <Link href="/privacy" target="_blank">
              Privacy Policy
            </Link>
          </Col>
        </Row>
        <div className="absolute -right-24 md:right-3 md:bottom-0 -bottom-12 opacity-[0.35] md:scale-100 scale-[0.7]">
          <Image
            placeholder="blur"
            loading="lazy"
            src={Images.ArrowImage}
            alt="arrow"
          />
        </div>
      </Wrapper>
    </div>
  )
}

export default FooterMobile
