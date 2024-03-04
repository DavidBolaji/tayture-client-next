'use client'
import React, { useState } from 'react'

const useDashboardNav = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  return { collapsed, setCollapsed }
}

export default useDashboardNav
