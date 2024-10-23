'use client'
import { useCallback, useEffect, useState } from 'react'

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
  prepareCvDate,
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
import { useParams } from 'next/navigation'

import { useGlobalContext } from '@/Context/store'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import ColorPalete from '@/components/ColorPalete'
import { useRouter } from 'next/router'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { IProf } from '../profile'
import Spinner from '@/components/Spinner/Spinner'

type hash = 'one' | 'three' | 'four'

const ResumePage = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState(initialSteps)
  const [formValues, setFormValues] = useState<Record<string, any>>({})
  const [cvReview, setCvReview] = useState(false)
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
  const queryClient = useQueryClient()

  const { data, isPending } = useQuery({
    queryKey: ['prof'],
    queryFn: async () => {
      const res = await Axios.get('/users/profile')
      return res.data.profile as IProf
    },
  })

  const r = useCallback((data: any) => {
    if (data) {
      const res = prepareCvDate(data)
      setFormValues(res)
    }
  }, [])

  const startProcess = useCallback(async () => {
    const res = await Axios.post('/cv/process')
    return res.data.processId
  }, [])

  useEffect(() => {
    if (data) {
      r(data)
    }
  }, [data, r])

  useEffect(() => {
    startProcess().then((id) => {
      queryClient.setQueryData(['process'], id)
    })
  }, [startProcess, queryClient])

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
    const processId = queryClient.getQueryData(['process'])
    try {
      messageApi.open({
        key,
        type: 'loading',
        content: 'Please do not leave page CV is being generated...',
        duration: 0,
      })
      await Axios.post(`/cv?template=${template}&review=${cvReview}`, {
        ...cvData,
        colorList: colorList[template as hash],
      })
      await Axios.patch(`/cv/${processId}`)
      messageApi.open({
        key,
        type: 'success',
        content:
          'Hurray!!!, Link to Cv has been generated and sent to your email.',
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
      {isPending ? (
        <Spinner color="orange" />
      ) : (
        <>
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
            <div className="mt-14"></div>
            <div className="absolute top-2 left-0 h-10 py-5 pr-2 bg-transparent z-30 w-full animate-in fade-in duration-500 flex items-center">
              <input
                type="checkbox"
                id="cvReview"
                className="ml-2 bg-white"
                onChange={(e) => {
                  setCvReview(e.target.checked)
                }}
              />
              <label htmlFor="cvReview" className="text-sm bg-white py-3 px-2 block w-full ">
                Review my CV
              </label>
            </div>
            {template && (
              <div className="flex items-center w-full justify-around -translate-x-14 -translate-y-8">
                <div className="flex-row jus items-center justify-center">
                  <div className="text-xs">Back</div>
                  <div className="flex justify-center mx-auto">
                    <ColorPalete
                      background="background"
                      template={template as string}
                    />
                  </div>
                </div>
                <div className="flex-row jus items-center justify-center">
                  <span className="text-xs">Front</span>
                  <ColorPalete
                    background="foreground"
                    template={template as string}
                  />
                </div>
                <div className="flex-row jus items-center justify-center">
                  <span className="text-xs">Text 1</span>
                  <ColorPalete
                    background="textOne"
                    template={template as string}
                  />
                </div>
                <div className="flex-row jus items-center justify-center">
                  <span className="text-xs">Text2</span>
                  <ColorPalete
                    background="colorParagraph"
                    template={template as string}
                  />
                </div>
              </div>
            )}
            <CVPreview {...cvData!} />
           
          </HandleCVModal>
        </>
      )}
    </div>
  )
}

ResumePage.getLayout = function getLayout(page: React.ReactNode) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default ResumePage
