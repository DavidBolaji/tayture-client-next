import { Ibigquestion } from '@/utils/data'
import Image from 'next/image'

function BigQuestion({ text, icon }: Ibigquestion) {
  return (
    <div
      data-aos="flip-up"
      className="bg-black_400 grid grid-cols-12 animate__animated animate__fadeInLeft rounded-[30px] px-[80px] py-[50px]"
    >
      <div className="text-white flex items-center md:order-first order-last md:col-span-8 col-span-12 sm:max-w-none md:max-w-none max-w-[350px] b">
        <h2 className="sm:text-[22px] sm:text-left text-[18px] md:text-[32px] lg:text-[42px] text-center font-[600] md:p-0">
          {text}
        </h2>
      </div>
      <div className="md:col-span-4 col-span-12 flex justify-center items-center sm:scale-95 scale-75 lg:scale-[95%] md:mt-0 sm:mt-0 -mt-5">
        <Image loading="lazy" src={icon} alt="big question" />
      </div>
    </div>
  )
}

export default BigQuestion
