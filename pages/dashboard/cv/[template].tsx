'use client'
import { useState } from 'react'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { cvValuesOne, initialSteps } from '@/components/cv/data'
import MultiStepForm from '@/components/cv/MultiStepForm'
import Aside from '@/components/cv/Aside'
import { AnimatePresence } from 'framer-motion'
import {
  convertData,
  cvDataTemplate,
  initialHash,
  sleep,
  validationHash,
} from '@/utils/helpers'
import HandleCVModal from '@/components/Modal/HandleCVModal'
import CVPreview, {
  ColorList,
  IProfile,
} from '@/components/cv/PreviewComponent'
import { Axios } from '@/request/request'
import { message } from 'antd'
import { useEffectOnce } from 'react-use'
import { useParams } from 'next/navigation'

import { useGlobalContext } from '@/Context/store'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import ColorPalete from '@/components/ColorPalete'
import { useRouter } from 'next/router'

type hash = 'one' | 'three' | 'four'

const ResumePage = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState(initialSteps)
  const [formValues, setFormValues] = useState<Record<string, any>>({})
  const [cvData, setCVData] = useState<{
    data: IProfile
    colorList: ColorList
    email: string
    //@ts-ignore
  } | null>(null)
  const [open, setOpen] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const { colorList } = useGlobalContext()
  const param = useParams()
  const router = useRouter()
  const template = param?.template

  useEffectOnce(() => {
    const initialValues = steps.reduce((acc, step) => {
      return { ...acc, ...initialHash[step.id as keyof typeof initialHash] }
    }, {})

    setFormValues(initialValues)
  })

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
        content: 'Please do not leave page CV is being generated...',
        duration: 0,
      })
      const response = await Axios.post(
        `/cv?template=${template}`,
        {
          ...cvData,
          colorList: colorList[template as hash],
        },
        {
          responseType: 'arraybuffer',
        },
      )

      const file = new Blob([response.data], { type: 'application/pdf' });
      
      // Create a link element, hide it, direct it towards the blob, and then trigger a click
      const fileURL = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = fileURL;
      link.download = `download.pdf`;
      document.body.appendChild(link);
      link.click();
      
      // Clean up by revoking the object URL
      URL.revokeObjectURL(fileURL);
      messageApi.open({
        key,
        type: 'success',
        content: 'Download Completed!',
        duration: 10,
      })
      await sleep(5000)
      router.push('/dashboard/cv/success')
    } catch (error) {
      console.error('Error fetching preview:', error)
      messageApi.open({
        key,
        type: 'error',
        content: `${(error as Error).message}`,
        duration: 4,
      })
    }
  }

  const moveStep = (dragIndex: number, hoverIndex: number) => {
    const newSteps = [...steps]
    const dragStep = newSteps.splice(dragIndex, 1)[0]
    newSteps.splice(hoverIndex, 0, dragStep)
    setSteps(newSteps)
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" id="admin_cv">
      {contextHolder}
      <div className="max-w-6xl mx-auto">
        <DndProvider backend={HTML5Backend}>
          <div className="grid grid-cols-7 md:gap-6">
            <div className="w-full col-span-7 md:col-span-2">
              <Aside
                steps={steps}
                setSteps={setSteps}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                moveStep={moveStep}
              />
            </div>
            <div className="w-full col-span-7 md:col-span-5">
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
        <div className="mt-10"></div>
        {template && (
          <div className="flex items-center w-full justify-around -translate-x-8 -translate-y-8">
            <div className="flex-row jus items-center justify-center">
              <div>Background</div>
              <div className="flex justify-center mx-auto">
                <ColorPalete
                  background="background"
                  template={template as string}
                />
              </div>
            </div>
            <div className="flex-row jus items-center justify-center">
              <span>Foreground</span>
              <ColorPalete
                background="foreground"
                template={template as string}
              />
            </div>
            <div className="flex-row jus items-center justify-center">
              <span>Text 1</span>
              <ColorPalete background="textOne" template={template as string} />
            </div>
            <div className="flex-row jus items-center justify-center">
              <span>Text2</span>
              <ColorPalete
                background="colorParagraph"
                template={template as string}
              />
            </div>
          </div>
        )}
        <CVPreview {...cvData!} />
      </HandleCVModal>
    </div>
  )
}

ResumePage.getLayout = function getLayout(page: React.ReactNode) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default ResumePage
