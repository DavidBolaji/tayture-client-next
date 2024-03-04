import { Collapse } from 'antd'
import { FiMinus, FiPlus } from 'react-icons/fi'
import styled from '@emotion/styled'
import { faqData } from '@/utils/data'

const StyledCollapse = styled.div`
  background-color: #fff !important;
  padding: 20px;
  border-radius: 10px;
  * > .ant-collapse-header-text {
    transform: translateX(-12px) !important;
    font-weight: 700;
    font-size: larger;
  }
  * > .ant-collapse-header {
    background-color: #fff !important;
  }

  * > .ant-collapse-content-box > p {
    font-size: large;
    transform: translateX(-20px);
    padding-left: 0px;
    color: #70645c;
    opacity: 1;
  }

  * > .ant-collapse-content-box {
    background-color: #fafafa !important;
    padding: 20px;
  }

  @media (max-width: 500px) {
    * > .ant-collapse-header-text {
      font-size: medium;
    }
  }
`

const FAQComponent = () => {
  return (
    <StyledCollapse>
      <Collapse
        defaultActiveKey={['1']}
        bordered={false}
        expandIcon={({ isActive }) =>
          isActive ? <FiMinus size={18} /> : <FiPlus size={18} />
        }
        expandIconPosition={'end'}
        size="large"
        items={faqData}
      />
    </StyledCollapse>
  )
}

export { FAQComponent }
