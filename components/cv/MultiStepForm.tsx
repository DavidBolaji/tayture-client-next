import { Field, Formik, FormikHelpers, FormikProps } from 'formik'
import DraggableSection from './DraggableSection'
import FormStep from './FormStep'
import CustomPhoneInput from '../Form/CustomPhoneInput/CustomPhoneInput'
import StyledInput from '../Form/NomalInput/StyledInput'
import StyledTextarea from '../Form/TextareaInput/StyledTextarea'
import LocationComponent from '../Form/LocationComponent/LocationComponent'
import { initialHash, validationHash } from '@/utils/helpers'
import { useEffect, useState } from 'react'
import { cvValuesOne } from './data'
import { AnimatePresence, motion } from 'framer-motion'

interface MultiStepFormProps {
  currentStep: number
  setCurrentStep: (step: number) => void
  steps: { id: string; title: string }[]
  submit: (values: any) => void
  formValues: any,
  setFormValues: any,
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({
  currentStep,
  setCurrentStep,
  steps,
  submit,
  formValues,
  setFormValues
}) => {
  // const [formValues, setFormValues] = useState<Record<string, any>>({})
  const [isStepValid, setIsStepValid] = useState<boolean[]>([])

  // useEffect(() => {
  //   const initialValues = steps.reduce((acc, step) => {
  //     return { ...acc, ...initialHash[step.id as keyof typeof initialHash] }
  //   }, {})
    
  //   setFormValues(initialValues)
  //   setIsStepValid(new Array(steps.length).fill(false))
  // }, [steps])

  useEffect(() => {
    setIsStepValid(new Array(steps.length).fill(false));
  }, [steps]);

  const handleSubmit = async (values: any, actions: FormikHelpers<any>) => {
    const updatedValues = { ...formValues, ...values }
    setFormValues(updatedValues)

    if (currentStep === steps.length - 1) {
      // Validate all steps before final submission
      const allStepsValid = await validateAllSteps(updatedValues)
      if (allStepsValid) {
        submit(updatedValues)
      } else {
        actions.setSubmitting(false)
        // Optionally, you can show an error message here
      }
    } else {
      setCurrentStep(currentStep + 1)
    }
    actions.setSubmitting(false)
  }

  const validateAllSteps = async (values: any) => {
    const stepValidations = await Promise.all(
      steps.map((step) =>
        validationHash[step.id as keyof typeof validationHash].isValid(values),
      ),
    )
    setIsStepValid(stepValidations)
    return stepValidations.every(Boolean)
  }

  const validateStep = async (values: any) => {
    const objH: any = {}
    for (let val in initialHash[
      steps[currentStep].id as keyof typeof validationHash
    ]) {
      objH[val as keyof typeof cvValuesOne] = values[val]
    }

    const isValid = await validationHash[
      steps[currentStep].id as keyof typeof validationHash
    ].isValid(objH)

    setIsStepValid((prev) => {
      const newIsStepValid = [...prev]
      newIsStepValid[currentStep] = isValid
      return newIsStepValid
    })
    return isValid
  }

  const renderStepContent = (stepId: string, formikProps: FormikProps<any>) => {
    switch (stepId) {
      case 'personal':
        return (
          <>
            <h2 className="text-2xl font-semibold mb-4">
              {steps[currentStep].title}
            </h2>
            <div>
              {[
                { title: 'name', type: 'text' },
                { title: 'email', type: 'text' },
                { title: 'phone', type: 'phone' },
                { title: 'location', type: 'location' },
                { title: 'linkedIn', type: 'text' },
                { title: 'summary', type: 'textarea' },
              ].map((field) =>
                field.type === 'text' ? (
                  <Field
                    key={field.title}
                    name={field.title}
                    placeholder={
                      field.title.charAt(0).toUpperCase() + field.title.slice(1)
                    }
                    as={StyledInput}
                  />
                ) : field.type === 'phone' ? (
                  <Field
                    key={field.title}
                    name={field.title}
                    as={CustomPhoneInput}
                  />
                ) : field.type === 'location' ? (
                  <LocationComponent
                    country="country"
                    state="state"
                    lga="lga"
                    city="city"
                  />
                ) : (
                  <Field
                    key={field.title}
                    name={field.title}
                    placeholder={
                      field.title.charAt(0).toUpperCase() + field.title.slice(1)
                    }
                    as={StyledTextarea}
                    rows={5}
                  />
                ),
              )}
            </div>
          </>
        )
      case 'skills':
      case 'education':
      case 'employment':
      case 'certificates':
      case 'languages':
      case 'hobbies':
        return (
          <>
            <h2 className="text-2xl font-semibold mb-4">
              {steps[currentStep].title}
            </h2>
            <DraggableSection name={stepId} formik={formikProps} />
          </>
        )

      default:
        return null
    }
  }

  return (
    <div className="">
      <Formik
        initialValues={formValues}
        validationSchema={
          validationHash[steps[currentStep].id as keyof typeof validationHash]
        }
        onSubmit={handleSubmit}
        validateOnMount
        validateOnChange
        enableReinitialize
      >
        {(formikProps: FormikProps<any>) => (
          <form onSubmit={formikProps.handleSubmit}>
            <AnimatePresence mode="wait">
              <motion.div
                key={steps[currentStep].id}
                initial={{
                  y: -100,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: {
                    type: 'spring',
                    duration: 1,
                  },
                }}
                exit={{
                  y: 300,
                  opacity: 0,
                }}
              >
                {renderStepContent(steps[currentStep].id, formikProps)}
                <FormStep
                  currentStep={currentStep}
                  formik={formikProps}
                  setCurrentStep={setCurrentStep}
                  steps={steps}
                  validateStep={() => validateStep(formikProps.values)}
                  isStepValid={isStepValid}
                />
              </motion.div>
            </AnimatePresence>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default MultiStepForm
