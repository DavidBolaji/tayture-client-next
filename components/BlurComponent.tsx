import { FaEyeSlash, FaMoneyBill } from 'react-icons/fa'
import { notification } from 'antd'
import ListComponent from './ListComponent'
import CVComponent from './CVComponent'
import { regularFont } from '@/assets/fonts/fonts'

const BlurComponent: React.FC<{pay: () => void, status: boolean, redirect: () => void,}> = ({pay, status, redirect}) => {

  const [api, contextHolder] = notification.useNotification({
    maxCount: 1
  })

  const openNotification = () => {
    
    api.open({
      key: 'update',
      message: <div className='uppercase text-[14px]'>👋 Fund wallet to complete hiring.</div>,
      description: (
        <div>
          <button
            disabled={status}
            onClick={() => {
             api.destroy('update')
              pay()
            }}
            className=" gap-2 bg-green-600 disabled:bg-green-100 disabled:cursor-not-allowed text-white px-5 mb-2 py-1 rounded-md cursor-pointer right-2 flex items-center justify-center"
          >
            <FaMoneyBill />
            <span>{!status ? 'Fund wallet' : 'Funded'}</span>
          </button>
          <p className={`text-[12px] mb-2 ${regularFont.className}`}>
            Funding your wallet allows you to proceed to interview stage. 
            🚀{' '}
          </p>
          <p className="text-[12px] mb-2">
            Remember, funds in your wallet remain yours until you successfully hire a candidate on Tayture.
           
          </p>
          <p className="text-[12px] font-bold mb-2 italic">
            {' '}
            💳 10,000 per candidate.
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
        <div className="flex items-center flex-col" onClick={status ? redirect: openNotification}>
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
