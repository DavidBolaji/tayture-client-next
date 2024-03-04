'use client'
import React from 'react'
import { Grid } from 'antd'

import FooterDesktop from './FooterDesktop'
import FooterMobile from './FooterMobile'

const { useBreakpoint } = Grid
export const Footer: React.FC = () => {
  const screen = useBreakpoint()
  return screen.lg ? <FooterDesktop /> : <FooterMobile />
}
