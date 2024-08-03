import dynamic from 'next/dynamic'
import React from 'react'
import { ContentState, EditorState } from 'draft-js'


const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  {
    ssr: false,
  },
)

const RenderText: React.FC<{ text: string }> = ({ text }) => {

  const convertBlogContent = (content: string) => {
    if (typeof window !== 'undefined') {
      const htmlToDraft = require('html-to-draftjs').default
      const cBlock = htmlToDraft(content)
      const cState = ContentState.createFromBlockArray(cBlock.contentBlocks)
      const eState = EditorState.createWithContent(cState)
      return eState
    }
  }

  return (
    <Editor
      editorState={convertBlogContent(text)}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      toolbarHidden={true}
    />
  )
}

export default RenderText
