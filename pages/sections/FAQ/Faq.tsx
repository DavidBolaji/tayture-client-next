import Wrapper from '@/components/Wrapper/Wrapper'
import RiskCard from '@/components/RiskCard/RiskCard'
import { FAQComponent } from '@/components/FAQComponent'
import { boldFont } from '@/assets/fonts/fonts'

function Faq() {
  return (
    <div className="bg-ash_200 ">
      <div
        className="xl:px-56 md:px-20 px-10"
        data-aos="zoom-in-up"
        data-aos-duration="800"
      >
        <RiskCard />
      </div>
      <Wrapper>
        <h2
          className={`md:text-[2.5rem] text-[1.50rem] mb-[1rem] text-center
        md:tracking-[-0.05rem] tracking-[-0.025rem] md:leading-[3rem] leading-[1.5rem] ${boldFont.className}`}
        >
          Still have questions ?
        </h2>
        <p
          className="text-center md:tracking-[-0.03rem] md:mb-[4rem]
        mb-[1.5rem] md:leading-[2rem] md:text-[1.5rem] text-[1rem]
        text-ash_400 md:w-full w-[300px]  mx-auto"
        >
          You can go through some of our frequently asked qestions (FAQs)
        </p>
        <div className="xl:px-56 md:px-20 pb-10">
          <FAQComponent />
        </div>
      </Wrapper>
    </div>
  )
}

export default Faq
