import React from 'react'

const RenderText: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: text,
      }}
    />
  )
}

export default RenderText
