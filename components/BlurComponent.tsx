import { FaEyeSlash } from 'react-icons/fa'
import { notification } from 'antd'
import ListComponent from './ListComponent'
import CVComponent from './CVComponent'

const BlurComponent: React.FC = () => {
  const [api, contextHolder] = notification.useNotification()

  const openNotification = () => {
    api.open({
      message: '👋 Hi there!',
      description: (
        <div>
          <p className="text-[12px] mb-2">
            Ready to unlock all the amazing features and access user profiles?
            🚀{' '}
          </p>
          <p className="text-[12px] mb-2">
            Simply click the Pay button to make your payment.
          </p>
          <p className="text-[12px] mb-2">
            {' '}
            💳 This will not only grant you access to users CV but will also
            enable you to take various actions within our platform.
          </p>
        </div>
      ),
      duration: 0,
    })
  }
  return (
    <div className="items-center mb-[8px] relative">
      {contextHolder}
      <div className="z-30 absolute w-full top-[20%] -left-12 cursor-pointer">
        <div className="flex items-center flex-col" onClick={openNotification}>
          <FaEyeSlash />
          <span className="text-[12px]">Tap to view details</span>
        </div>
      </div>
      <div className="items-center mb-[8px] relative blur-sm">
        <ListComponent
          key="l1"
          col
          title="Highest Education"
          text="B.sc computee science"
        />
        <ListComponent
          key="l2"
          col
          title="Subject expertise"
          text="mathematics, physics, further maths"
        />
        <ListComponent
          key="l3"
          col
          title="skills"
          text="communication, classroom management"
        />
        <div className="mt-2 -translate-x-6 scale-75">
          <CVComponent name="david.pdf" ext="pdf" onClick={() => {}} />
        </div>
      </div>
    </div>
  )
}

export default BlurComponent
