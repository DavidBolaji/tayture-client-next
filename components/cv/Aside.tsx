import React, { useRef } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { XYCoord } from 'dnd-core';
import Button from '../Button/Button';
import { FiMove } from 'react-icons/fi';

interface Step {
  id: string;
  title: string;
}

interface AsideProps {
  steps: Step[];
  setSteps: React.Dispatch<React.SetStateAction<Step[]>>;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  moveStep: (dragIndex: number, hoverIndex: number) => void
}

const Aside: React.FC<AsideProps> = ({
  steps,
  setSteps,
  currentStep,
  setCurrentStep,
  moveStep
}) => {
 

  return (
    <aside className="bg-white p-4 rounded-lg shadow">
      <ul>
        {steps.map((step, index) => (
          <DraggableStep
            key={step.id}
            index={index}
            step={step}
            moveStep={moveStep}
            isActive={index === currentStep}
            onClick={() => setCurrentStep(index)}
          />
        ))}
      </ul>
    </aside>
  );
};

interface DraggableStepProps {
  step: Step;
  index: number;
  moveStep: (dragIndex: number, hoverIndex: number) => void;
  isActive: boolean;
  onClick: () => void;
}

const DraggableStep: React.FC<DraggableStepProps> = ({
  step,
  index,
  moveStep,
  isActive,
  onClick,
}) => {
  const ref = useRef<HTMLLIElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'STEP',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'STEP',
    hover: (item: { index: number }, monitor: DropTargetMonitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveStep(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <li
      ref={ref}
      className={`text-left h-full w-full mb-1 transition-all duration-200 ease-in-out
      ${isDragging ? 'opacity-50 scale-105 cursor-grabbing' : 'cursor-grab'}`}
      style={{ touchAction: 'none' }}
    >
      <div className="flex gap-x-2 items-center">
        <div className="border p-2.5 shadow">
          <FiMove />
        </div>
        <Button
          render="light"
          bold={false}
          hover
          text={step.title}
          className={`transition-colors duration-300 hover:bg-orange_light hover:text-white rounded-r-sm w-full py-2 flex px-2 justify-start
            ${isActive ? 'bg-orange text-white' : ''}`}
          onClick={onClick}
        />
      </div>
    </li>
  );
};

export default Aside;