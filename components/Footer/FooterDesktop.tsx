'use client'
import { Icons, Images } from '@/assets'
import { Col, Grid, Row } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import Wrapper from '../Wrapper/Wrapper'

const { useBreakpoint } = Grid

function FooterDesktop() {
  const screen = useBreakpoint()
  return (
    <div className="bg-black_400 h-[248px] relative py-10">
      {/* <Row className="flex items-center overflow-hidden relative">
        <div className="h-[248px] w-full">
          <Image
            placeholder="blur"
            loading="lazy"
            src={Images.Footer}
            alt="footer"
            className="object-cover h-full w-full"
          />
        </div>
        <div className="px-16">
          <Row className="absolute top-10">
            <Col span={24} className="mb-3">
              <Icons.TaytureLogo
                width={screen.lg ? "" : "90"}
                height={screen.lg ? "" : "90"}
              />
            </Col>
            <p className="text-white text-[14px] max-w-[400px] ml-1">
              Tayture is an innovative platform designed to support the
              different players in the field of education, with a focus on
              teachers, school administrator, and parents. It provides
              resources, tools, personalized support, and a community for
              enhanced teaching and learning experiences.
            </p>
          </Row>

          <Row className="absolute bottom-3 w-full">
            <Col
              span={6}
              className="text-white relative xl:text-[1rem] leading-[1.5rem] z-10 text-[16px] opacity-50"
            >
              © 2023 TAYTURE. All rights reserved.
            </Col>
            <Col
              span={12}
              className="text-white relative xl:text-[1rem] leading-[1.5rem] z-10 text-[16px] opacity-50"
            >
              <Link href="/privacy" target="_blank">
                Privacy Policy
              </Link>
            </Col>
          </Row>
        </div>
      </Row> */}
      <Wrapper>
        <div className="grid grid-cols-1 absolute">
          <div className="col-span-1 h-full">
            <Image
              placeholder="blur"
              loading="lazy"
              src={Images.Footer}
              alt="footer"
              className="object-cover h-full w-full"
            />
          </div>
        </div>
        <div className="max-w-[400px]">
          <div className="flex flex-col">
            <div className="mb-3">
              <Icons.TaytureLogo
                width={screen.lg ? '' : '90'}
                height={screen.lg ? '' : '90'}
              />
            </div>
            <p className="text-white text-[14px] ml-1 h-20">
             Tayture is a workforce enabling solution for k-12 educators.
            </p>
          </div>

          <div className="flex mt-4 justify-between max-w-[800px] w-full">
            <div className="text-white relative xl:text-[0.9rem] leading-[1.5rem] z-10 text-[14px] opacity-50">
              © {new Date().getFullYear()} TAYTURE. All rights reserved.
            </div>
            <div className="text-white relative xl:text-[0.9rem] leading-[1.5rem] z-10 text-[14px] opacity-50">
              <Link href="/privacy" target="_blank" rel="noreferrer">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  )
}

export default FooterDesktop
