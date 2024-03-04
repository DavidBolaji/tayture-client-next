import Image from 'next/image'
import React from 'react'

const CardComponent: React.FC<{
  src: any
  alt: string
  light?: boolean
  right?: boolean
}> = ({ src, alt, light, right }) => (
  <div className="relative md:scale-100 scale-[0.68] md:mb-0 -mb-3">
    <div className="w-[443px] h-[318px] rounded-[1.25rem] z-10 relative">
      <Image
        placeholder="blur"
        priority
        src={src}
        alt={alt}
        height={318}
        width={443}
        className="w-full h-full object-cover object-top rounded-[1.25rem]"
      />
    </div>
    <div
      className={`w-[443px] h-[318px] rounded-[1.25rem] absolute border-2  top-[1rem]  ${
        light ? 'border-black' : 'border-orange'
      }   z-20 ${right ? '-left-[1rem]' : 'left-[1rem]'}`}
    />
    <div
      className={`w-[443px] h-[318px] rounded-[1.25rem] absolute -top-[1rem] ${
        right ? 'left-[1rem]' : '-left-[1rem]'
      } ${light ? 'bg-orange' : 'bg-black'} `}
    />
  </div>
)

export default CardComponent
