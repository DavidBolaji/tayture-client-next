import React from 'react'
import { StyledAttentionModal } from './AttentionModal.style'
import { regularFont } from '@/assets/fonts/fonts'
import { Spin } from 'antd'

const AttentionModal: React.FC<{
  isOpen: boolean
  close: () => void
  ok: () => void
  loading: boolean
}> = ({ isOpen, close, ok, loading }) => (
  <StyledAttentionModal
    open={isOpen}
    closable
    onOk={ok}
    okText={loading ? <Spin /> :"Yes"}
    cancelText="No"
    onCancel={close}
  >
    <h3
      className={`font-[600] text-black_400 text-[18px] mb-4 ${regularFont.className}`}
    >
      🚫 Attention!
    </h3>
    <p className={`text-[14px] ${regularFont.className}`}>
      For school admins only. Are you a school admin?
    </p>
  </StyledAttentionModal>
)

export default AttentionModal
