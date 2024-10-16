import { useState } from 'react';

type UseCustomStepperProps = {
  steps: string[];
  initialStep?: number;
};
export const useCustomStepper = ({
  steps,
  initialStep = 0,
}: UseCustomStepperProps) => {
  const [activeStep, setActiveStep] = useState(initialStep);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [disableNextStepBtn, setDisableNextStepBtn] = useState(false);

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    const newSkipped = skipped;

    // prevent finish step
    if (activeStep === steps.length - 1) return;

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  // for step navigation in StepButton label
  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return {
    activeStep,
    disableNextStepBtn,

    handleNext,
    handleBack,
    handleStep,
    handleReset,
    isStepSkipped,

    setDisableNextStepBtn,
  };
};
