"use client"
import { Categories } from '@prisma/client'
import React from 'react'
import WidgetTags from '../components/WidgetTags'

const CategoriesSection: React.FC<{ categories: Categories[] }> = ({
  categories,
}) => {
  return categories.map((cat: Categories) => (
    <WidgetTags key={cat.id} tag_text={cat.title} tag_link="#" />
  ))
}

export default CategoriesSection
