interface BlogTagProps {
  text: string;
  tag_link: string;
  className?: string;
}

const BlogTag = ({ text, tag_link, className }: BlogTagProps) => {
  return (
    <>
      <a href={tag_link} className={className}>
        {text}
      </a>
    </>
  )
}

export default BlogTag
