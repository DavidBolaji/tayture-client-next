import { useGlobalContext } from '@/Context/store';
import React from 'react';

import { IoIosCloseCircle } from 'react-icons/io';
import styled from '@emotion/styled';
import { Modal } from 'antd';
import EducationForm from './EducationForm';

export const StyledModal = styled(Modal)`
  background: #fff;
  border-radius: 15px !important;
  padding: 0px;
  overflow: hidden;
  position: relative;

  .ant-modal-close {
    display: none;
  }

  .ant-modal-header {
    padding: 0px;
  }

  .ant-modal-content {
    box-shadow: none;
    padding: 0px;
  }
`;


const EducationModal: React.FC = () => {
    const { setUI, ui } = useGlobalContext()
    const handleClose = () => {
        setUI((prev) => {
          return {
            ...prev,
            educationModal: {
              ...prev.educationModal,
              visibility: false,
            },
          }
        })
      }
 
  return (
    <StyledModal
      open={ui.educationModal?.visibility}
      closable
      footer={null}
      onCancel={() => handleClose()}
    >
      <div className="w-full h-full pt-[21px] pb-[41px] ">
        <h3 className="text-center mb-[48px] text-[24px] font-[600]">Add Education</h3>
        <EducationForm />
      </div>
      <div
        className="absolute top-7 right-8 z-20 hover:scale-[1.1] delay-200 
        transition-transform cursor-pointer duration-1000 ease-in-out cursor-point rounded-full"
        onClick={() => handleClose()}
      >
        <IoIosCloseCircle size={24} color="#666666" />
      </div>
    </StyledModal>
  );
};

export default EducationModal;
