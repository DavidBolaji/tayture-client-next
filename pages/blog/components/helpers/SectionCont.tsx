const SectionCont: React.FC<{ children: React.ReactNode; bg_color: string }> = ({ children,bg_color }) => {
    return (
      <div
        className= {`relative py-16 lg:py-28 px-4 sm:px-16 ${bg_color}`} style={{borderRadius:'40px'}}
      >
        {children}
      </div>
    )
  }
  
  export default SectionCont