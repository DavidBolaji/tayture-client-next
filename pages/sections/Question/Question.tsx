import BigQuestion from '@/components/BigQuestion/BigQuestion'
import Wrapper from '@/components/Wrapper/Wrapper'
import { bigQuesData } from '@/utils/data'

function Question() {
  return (
    <div className="bg-orange md:py-20 py-10">
      <Wrapper>
        <BigQuestion text={bigQuesData.text} icon={bigQuesData.icon} />
      </Wrapper>
    </div>
  )
}

export default Question
