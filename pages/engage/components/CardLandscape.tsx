import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { FaPlay } from 'react-icons/fa'
import { MdOutlineAdsClick } from 'react-icons/md';

interface CardLandscapeProps{
    image_src: string;
    heading: string;
    icon_link_text: string;
    is_play_icon:boolean;
    href: string

}

function CardLandscape({image_src,heading,icon_link_text,href,is_play_icon}:CardLandscapeProps) {
  return (
    <div className="Card relative flex group items-center p-4 rounded-3xl border border-neutral-100 bg-white h-full hover:scale-105 transition-all duration-300">
    {/* Image Cont */}
    <div className="w-1/4 flex-shrink-0 ">
      <div className="rounded-[15px] w-full h-[100px] relative overflow-hidden shadow-lg">
        <Image
          src={image_src}
          width={100}
          height={100}
          className="w-full absolute inset-0 group-hover:scale-125 transform transition-transform duration-500"
          alt="360 degree video"
        />
      </div>
    </div>

    {/* Heading and Button Cont */}
    <div className="flex flex-col flex-grow ml-4">
      <h2 className="card-title block font-black text-sm sm:text-base leading-1 tracking-normal ">
        {heading}
      </h2>

      <Link href={href} className="linkCont ">
        <div className="inline-flex items-center mt-3 pr-4 py-0.5 hover:pl-0.5 cursor-pointer rounded-full transition-all duration-500 hover:bg-[#F5EFEB]">
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5EFEB] text-orange text-[10px]">
            {is_play_icon ? <FaPlay/>:<MdOutlineAdsClick className='text-[18px]'/>}
          </span>
          <span className="ml-3 text-sm font-bold">{icon_link_text}</span>
        </div>
      </Link>
    </div>
  </div>
  )
}

export default CardLandscape