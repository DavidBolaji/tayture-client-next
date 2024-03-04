import { IlearningData, learningData } from '@/utils/data'

const LearningCardMoble = () => {
  const renderGoals = learningData.map((data: IlearningData, ind: number) => (
    <div
      data-aos="flip-left"
      data-delay={ind * 5000}
      key={data.id}
      className="bg-white mr-5 md:w-[500px] w-[300px] py-[1.5rem] pl-[1.5rem] pr-[1.3125rem] rounded-[1.25rem]"
    >
      <div className="mb-[1rem]">{data.icon}</div>
      <h2 className="text-black_200 text-[1.25rem] mb-[0.5rem]">{data.text}</h2>
      <p className="text-ash_400 text-[1rem]">{data.writeup}</p>
    </div>
  ))
  return <>{renderGoals}</>
}

export default LearningCardMoble
