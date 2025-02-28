//@ts-nocheck
import React from 'react'
import { Select, Tag } from 'antd'
import type { CustomTagProps } from 'rc-select/lib/BaseSelect'

const tagRender = (props: CustomTagProps) => {
  const { label, closable, onClose } = props
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <Tag
      color={'#FF7517'}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  )
}

function TagChart({
  placeholder,
  options,
  setPath,
}: {
  placeholder: string
  options: { [key: string]: string }[]
  setPath: (path: string[]) => void
}) {
  const handleChange = (val: string[], _val2: any) => {
    setPath(val)
  }
  return (
    <Select
      placeholder={placeholder}
      mode="multiple"
      tagRender={tagRender}
      onChange={handleChange}
      style={{ width: '100%', textAlign: 'left' }}
      options={options}
    />
  )
}

export default TagChart
