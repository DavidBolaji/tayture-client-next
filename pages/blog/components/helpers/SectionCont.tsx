const SectionCont: React.FC<{ children: React.ReactNode; bg_color: string; class_name?:string}> = ({ children,bg_color,class_name}) => {
    return (
      <div
        className= {`relative pt-16 lg:pt-28 px-4 sm:px-16 ${bg_color} ${class_name}`} style={{borderRadius:'40px'}}
      >
        {children}
      </div>
    )
  }
  
  export default SectionCont