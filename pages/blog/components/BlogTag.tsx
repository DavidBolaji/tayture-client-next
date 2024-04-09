interface BlogTagProps {
  text: string;
  bg_color: string;
  text_color: string;
  tag_link: string;
  hover_bg_color: string;
  hover_text_color:string;
}

const BlogTag = ({ text, bg_color, text_color, tag_link,hover_bg_color, hover_text_color}: BlogTagProps) => {
  return (
    <div>
      <a
        style={{
          backgroundColor: bg_color,
          color: text_color,
          borderRadius: '10px',
          fontSize: '0.75rem',
          fontWeight: '500',
          lineHeight: '1rem',
          paddingBlock: '0.25rem',
          paddingInline: '0.625rem',
          transitionDuration:'0.3s',
          transitionProperty:'color, background-color, border-color, text-decoration-color, fill, stroke',
        }}
        href={tag_link}
        
      >
        {text}
      </a>
    </div>
  )
}

export default BlogTag
