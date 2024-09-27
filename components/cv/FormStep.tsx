import { FormikProps } from 'formik'
import Button from '../Button/Button'
import { useEffect } from 'react';

interface FormStepProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  steps: { id: string; title: string }[];
  formik: FormikProps<any>;
  isStepValid: boolean[];
  validateStep: () => Promise<boolean>;
}

const FormStep: React.FC<FormStepProps> = ({
  currentStep,
  setCurrentStep,
  steps,
  formik,
  isStepValid,
  validateStep,
}) => {
  const isLastStep = currentStep === steps.length - 1;

  useEffect(() => {
    validateStep();
  }, [formik.values, currentStep]);

  useEffect(() => {
    const doc = document.querySelector('.ant-layout-content')
    const home = document.querySelector('#home')
    if (typeof document !== 'undefined') {
      const t = setTimeout(() => {
        doc?.scrollTo({
          behavior: 'smooth',
          top: 0,
        })
        home?.scrollTo({
          behavior: 'smooth',
          top: 0,
        })
        clearTimeout(t)

      }, 1500)
    }
  }, [currentStep]);

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleNext = async () => {
     await validateStep();
  };

  return (
    <div>
      <div className="mt-8 flex justify-between">
        {currentStep > 0 && (
          <Button
            render="dark"
            text={'Previous'}
            bold={false}
            type="button"
            onClick={handlePrevious}
          />
        )}
        {isLastStep ? (
          <Button
            render="dark"
            text={'Submit'}
            bold={false}
            type="submit"
            disabled={formik.isSubmitting || !isStepValid.every(Boolean)}
          />
        ) : (
          <Button
            render="dark"
            text={'Next'}
            bold={false}
            disabled={!isStepValid[currentStep]}
            type="submit"
            onClick={handleNext}
          />
        )}
      </div>
    </div>
  );
};

export default FormStep