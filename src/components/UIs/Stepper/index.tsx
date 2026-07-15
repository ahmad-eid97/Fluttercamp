'use client';
import toast from "react-hot-toast";
//= Components
// import Tooltip from "@mui/material/Tooltip";
//= Styles
import cls from './stepper.module.scss';

type Step = {
  id: number
  label: string
  icon: React.ReactElement
}

type Props = {
  steps: Step[]
  selectedStep: Step
  setSelectedStep: (step: Step) => void
  guarded?: boolean;
  lockedSteps?: number[];
}

function Stepper({ steps, selectedStep, setSelectedStep, lockedSteps }: Props) {
  function gotToStep(step: Step) {
    if (lockedSteps) {
      if (lockedSteps.indexOf(step.id) === -1) {
        setSelectedStep(step);
      } else {
        toast.error('you need to complete current step first');
      }
    } else {
      setSelectedStep(step);
    }
  }

  return (
    <div className={cls.stepper}>
      <div className={cls.steps}>
        {steps.map((step) => (
          // <Tooltip title={step.label} placement="top" key={step.id}>
          (<div className={`${cls.step} ${selectedStep.label === step.label ? cls.active : ''}`} onClick={() => gotToStep(step)} key={step.id}>
            <div className={cls.circle}>
              {step.icon}
            </div>
            <p>
              <span>
                {step.label}
              </span>
            </p>
          </div>)
          // </Tooltip>
        ))}
      </div>
    </div>
  );
}

export default Stepper;
