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
              Tayture is a workforce-enabling solution for k-12 educators.
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
