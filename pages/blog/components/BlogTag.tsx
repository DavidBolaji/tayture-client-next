"use client"
interface BlogTagProps {
  text?: string
  tag_link?: string
  className?: string
}

const BlogTag: React.FC<BlogTagProps> = ({ text, tag_link, className }) => {
  return (
    <>
      <a href={tag_link} className={className}>
        {text}
      </a>
    </>
  )
}

export default BlogTag
