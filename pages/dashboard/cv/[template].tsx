'use client'
import { useEffect, useState } from 'react'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { cvValuesOne, initialSteps } from '@/components/cv/data'
import MultiStepForm from '@/components/cv/MultiStepForm'
import Aside from '@/components/cv/Aside'
import { AnimatePresence } from 'framer-motion'
import { convertData, initialHash, validationHash } from '@/utils/helpers'
import HandleCVModal from '@/components/Modal/HandleCVModal'
import CVPreview, { ColorList, IProfile } from '@/components/cv/PreviewComponent'
import { Axios } from '@/request/request'
import { message } from 'antd'

export default function ResumePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState(initialSteps)
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [cvData, setCVData] = useState<{data: IProfile , colorList: ColorList , email: string} | null>(null)
  const [open, setOpen] = useState(false)
  const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
    const initialValues = steps.reduce((acc, step) => {
      return { ...acc, ...initialHash[step.id as keyof typeof initialHash] }
    }, {})
    
    setFormValues(initialValues)
  }, [])

  const handleSubmit = (values: any) => {
    const orderedValues = steps.reduce((acc, step) => {
      acc[step.id] = values[step.id]
      return acc
    }, {} as any)

    for (let val in initialHash[steps[0].id as keyof typeof validationHash]) {
      orderedValues[val as keyof typeof cvValuesOne] = values[val]
    }
    delete orderedValues.personal

    const nData = convertData(orderedValues)
    setCVData(nData)
    setOpen(true)
  }

  const handleDownload = async () => {
    const key = 'cv'
    try {
      messageApi.open({
        key,
        type: 'loading',
        content: 'Loading...',
        duration: 0,
      });
      const response = await Axios.post('/cv', {
       ...cvData
      }, {})

      messageApi.open({
        key,
        type: 'success',
        content: 'Loaded!',
        duration: 10,
      });
    } catch (error) {
      console.error('Error fetching preview:', error)
      messageApi.open({
        key,
        type: 'error',
        content: `${(error as Error).message}`,
        duration: 4,
      });
    }
  }

  const moveStep = (dragIndex: number, hoverIndex: number) => {
    const newSteps = [...steps];
    const dragStep = newSteps.splice(dragIndex, 1)[0];
    newSteps.splice(hoverIndex, 0, dragStep);
    setSteps(newSteps);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" id="admin_cv">
      {contextHolder}
      <div className="max-w-6xl mx-auto">
        <DndProvider backend={HTML5Backend}>
          <div className="grid grid-cols-7 gap-6">
            <div className="w-full col-span-2">
              <Aside
                steps={steps}
                setSteps={setSteps}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                moveStep={moveStep}
              />
            </div>
            <div className="w-full col-span-5">
              <AnimatePresence mode="wait">
                <MultiStepForm
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                  steps={steps}
                  submit={handleSubmit}
                  formValues={formValues}
                  setFormValues={setFormValues}
                />
              </AnimatePresence>
            </div>
          </div>
        </DndProvider>
      </div>
      <HandleCVModal
        isOpen={open}
        close={() => setOpen(false)}
        ok={handleDownload}
      >
        <CVPreview {...cvData!} />
      </HandleCVModal>
    </div>
  )
}




