import React from 'react'
import CardLandscape from './CardLandscape'

function Section1Cards() {
  const cardDetails = [
    {
      image_src:
        'https://images.pexels.com/photos/3428498/pexels-photo-3428498.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260',
      heading: 'Watch SchoolRoom episodes',
      icon_link_text: 'See episodes',
      href: '#',
      is_play_icon : true,
    },
    {
      image_src:
        'https://images.pexels.com/photos/3428498/pexels-photo-3428498.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260',
      heading: 'Join the top educators in Nigeria(TEN) Group',
      icon_link_text: 'Join',
      href: '#',
      is_play_icon : false,
    },
    {
      image_src:
        'https://images.pexels.com/photos/3428498/pexels-photo-3428498.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260',
      heading: 'Get educator scholarship for teachers',
      icon_link_text: 'Apply',
      href: '#',
      is_play_icon : false,
    },
    {
      image_src:
        'https://images.pexels.com/photos/3428498/pexels-photo-3428498.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260',
      heading: 'Recommend an Educator for recognition',
      icon_link_text: 'Yes',
      href: '#',
      is_play_icon : false,
    },
    {
      image_src:
        'https://images.pexels.com/photos/3428498/pexels-photo-3428498.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260',
      heading: 'Partner with us to honour top Educators',
      icon_link_text: 'Yes',
      href: '#',
      is_play_icon : false,
    },
    {
      image_src:
        'https://images.pexels.com/photos/3428498/pexels-photo-3428498.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260',
      heading: 'Watch Educator recognition video',
      icon_link_text: 'See episodes',
      href: '#',
      is_play_icon : true,
    },
    {
      image_src:
        'https://images.pexels.com/photos/3428498/pexels-photo-3428498.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260',
      heading: 'Get a Job in a school',
      icon_link_text: 'See jobs',
      href: '#',
      is_play_icon : false,
    },
    {
      image_src:
        'https://images.pexels.com/photos/3428498/pexels-photo-3428498.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260',
      heading: 'Hire staff for your school',
      icon_link_text: 'Post a job',
      href: '#',
      is_play_icon : false,
    },
  ]
  return (
    <div className="z-0 bg-neutral-100 rounded-[40px] relative p-10 md:p-12 mt-10">
      {/* grid cont */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {cardDetails.map((card, index) => (
          <CardLandscape
            key={index}
            icon_link_text={card.icon_link_text}
            heading={card.heading}
            image_src= {card.image_src}
            href={card.href}
            is_play_icon = {card.is_play_icon}
          />
        ))}
      </div>
    </div>
  )
}

export default Section1Cards
