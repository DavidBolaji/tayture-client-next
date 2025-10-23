import { IlearningData, learningData } from '@/utils/data'
import { Col } from 'antd'

const LearningCardDesktop = () => {
  const renderGoals = learningData.map((data: IlearningData) => (
    <Col key={data.id} xs={12} sm={12} md={12} lg={6}>
      <div
        data-aos="flip-up"
        className="overflow-hidden transition-all duration-1000 ease-in-out bg-white cursor-pointer xl:marker:h-24 md:h-24 hover:h-full"
      >
        <div className="group relative flex flex-col items-center mb-6 h-16 xl:h-[0px] opacity-1 hover:h-36 peer hover:opacity-90 ease-in-out cursor-pointer duration-1000 ">
          <div className="flex flex-col justify-center items-center  transition-transform transform group-hover:-translate-y-[55%] ease-in-out duration-1000">
            <div className="group-hover:ease-in-out group-hover:opacity-0 transition-transform transform scale-75 delay-500">
              {data.icon}
            </div>
            <p className="text-center whitespace-pre-line break-inside sub_two font-[700] w-52">
              {data.text}
            </p>
          </div>
          <div className="w-full h-full opacity-[0.9] absolute delay-200 -z-10 group-hover:z-10 ">
            <p className="text-black_200 text-center text-[16px] mt-4 px-2 transition-all ease-in-out opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-1000 group-hover:translate-y-[25%]">
              {data.writeup}
            </p>
          </div>
        </div>
      </div>
    </Col>
  ))
  return <>{renderGoals}</>
}

export default LearningCardDesktop
