import { useState } from 'react';

type UseCustomStepperProps = {
  steps: string[];
};
export const useCustomStepper = ({ steps }: UseCustomStepperProps) => {
  const [activeStep, setActiveStep] = useState(0);
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
