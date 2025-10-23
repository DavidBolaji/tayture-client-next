"use client"
import type React from "react"

import { cn } from "@/utils/helpers"
import { CheckCircleFilled } from "@ant-design/icons"


interface Step {
  title: string
  description: string
}

interface ProgressStepperProps {
  steps: Step[]
  currentStep: number
  className?: string
}

export const ProgressStepper: React.FC<ProgressStepperProps> = ({ steps, currentStep, className }) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="relative mb-4 md:mb-8">
        {/* Connector Lines - positioned absolutely behind steps */}
        <div className="absolute top-4 md:top-5 left-0 right-0 flex justify-between items-center px-4 md:px-5">
          {steps.slice(0, -1).map((_, index) => {
            const isCompleted = index < currentStep
            const isCurrentConnection = index === currentStep - 1

            return (
              <div
                key={index}
                className="flex-1 h-0.5 relative mx-2 md:mx-3"
                style={{
                  marginLeft: index === 0 ? "0" : "1rem",
                  marginRight: index === steps.length - 2 ? "0" : "1rem",
                }}
              >
                <div className="absolute inset-0 bg-border rounded-full" />
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-r rounded-full transition-all duration-500",
                    isCompleted ? "from-green-500 to-green-500 w-full" : "from-primary to-primary",
                    isCurrentConnection ? "w-full" : isCompleted ? "w-full" : "w-0",
                  )}
                />
              </div>
            )
          })}
        </div>

        {/* Steps - positioned with justify-between */}
        <div className="flex justify-between items-start relative z-10">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep
            const isCurrent = index === currentStep
            const isUpcoming = index > currentStep

            return (
              <div key={index} className="flex flex-col items-center">
                {/* Step Circle */}
                <div
                  className={cn(
                    "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-semibold transition-all duration-300 animate-scale-in relative z-10",
                    isCompleted && "bg-green-500 text-white shadow-lg shadow-green-500/25",
                    isCurrent &&
                      "bg-primary text-primary-foreground shadow-lg shadow-primary/25 ring-2 md:ring-4 ring-primary/20",
                    isUpcoming && "bg-muted text-muted-foreground border-2 border-border",
                  )}
                >
                  {isCompleted ? <CheckCircleFilled className="w-3 h-3 md:w-5 md:h-5" /> : <span>{index + 1}</span>}
                </div>

                {/* Step Info */}
                <div className="mt-2 md:mt-3 text-center max-w-[80px] md:max-w-[120px]">
                  <p
                    className={cn(
                      "text-xs md:text-sm font-medium transition-colors duration-200",
                      isCompleted && "text-green-600",
                      isCurrent && "text-primary",
                      isUpcoming && "text-muted-foreground",
                    )}
                  >
                    {step.title}
                  </p>
                  <p className="text-[10px] md:text-xs text-muted-foreground mt-1 leading-tight hidden sm:block">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
