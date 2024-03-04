import React from 'react'

const RenderProgress: React.FC<{
  box: number
  done: number
  path: string
}> = ({ box, done, path }) => {
  const num = Array(box).fill(0)
  const renderBox = num.map((_, ind: number) =>
    // const id = useId();
    ind < done ? (
      <div
        key={ind}
        className="w-[20px] h-[10px] md:w-[30px] md:h-[10px] bg-orange transition-all ease-linear"
      />
    ) : (
      <div
        key={ind}
        className="w-[20px] h-[10px] md:w-[30px] md:h-[10px] bg-[#E9E8E8] transition-all ease-linear"
      />
    ),
  )
  return (
    <div className="md:-mt-2 mb-3">
      <div className="w-full flex justify-center">
        <span className="inline-block  items-center justify-center bg-tag py-[0.15rem] px-[1rem] rounded-full border border-tag_border md:mb-5 mb-8">
          <span className="text-[#232323] text-[12px] ">
            I&apos;m a <span className="capitalize">{path}</span>{' '}
          </span>
        </span>
      </div>
      <div className="flex gap-3 justify-center">{renderBox}</div>
    </div>
  )
}

export default RenderProgress
