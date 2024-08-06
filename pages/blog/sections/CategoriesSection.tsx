"use client"
import { Categories } from '@prisma/client'
import React from 'react'
import WidgetTags from '../components/WidgetTags'

const CategoriesSection: React.FC<{ categories: Categories[] }> = ({
  categories
}) => {
  const list = categories?.map((cat: Categories) => (
    <WidgetTags key={cat.id} tag_text={cat.title} tag_link="#" />
  ))

  return <>{list}</>
}

export default CategoriesSection
