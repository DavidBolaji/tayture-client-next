"use client"
import type React from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronRight } from "lucide-react"
import { AdministratorHire, teacherHire } from "@/utils/data"


interface JobCategorySelectorProps {
  jobRole: string
  jobActive: string | string[]
  onJobRoleChange: (value: string) => void
  onJobActiveChange: (value: string | string[]) => void
  errors?: {
    job_role?: string
    job_active?: string
  }
  touched?: {
    job_role?: boolean
    job_active?: boolean
  }
}

export const JobCategorySelector: React.FC<JobCategorySelectorProps> = ({
  jobRole,
  jobActive,
  onJobRoleChange,
  onJobActiveChange,
  errors,
  touched,
}) => {
  const handleTeacherChange = (value: string, checked: boolean) => {
    const currentValues = Array.isArray(jobActive) ? jobActive : []

    if (checked) {
      onJobActiveChange([...currentValues, value])
    } else {
      onJobActiveChange(currentValues.filter((v) => v !== value))
    }
  }

  const handleAdminChange = (value: string) => {
    onJobActiveChange(value)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <Label className="text-base font-medium">Select Teacher or Administrator?</Label>

          <RadioGroup value={jobRole} onValueChange={onJobRoleChange} className="space-y-4">
            {/* Teacher Option */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="teacher" id="teacher" />
                <Label htmlFor="teacher" className="flex items-center space-x-2 cursor-pointer">
                  {jobRole === "teacher" ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  <span>Teacher</span>
                </Label>
              </div>

              {jobRole === "teacher" && (
                <div className="ml-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
                  <Label className="text-sm text-muted-foreground">Select school levels:</Label>
                  {teacherHire.map((option) => {
                    const isChecked = Array.isArray(jobActive) && jobActive.includes(option.value)
                    return (
                      <div key={option.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`teacher-${option.value}`}
                          checked={isChecked}
                          onCheckedChange={(checked) => handleTeacherChange(option.value, checked as boolean)}
                        />
                        <Label htmlFor={`teacher-${option.value}`} className="text-sm cursor-pointer">
                          {option.label}
                        </Label>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Administrator Option */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="admin" id="admin" />
                <Label htmlFor="admin" className="flex items-center space-x-2 cursor-pointer">
                  {jobRole === "admin" ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  <span>Administrator</span>
                </Label>
              </div>

              {jobRole === "admin" && (
                <div className="ml-6 space-y-2 animate-in slide-in-from-top-2 duration-200 max-h-64 overflow-y-auto">
                  <Label className="text-sm text-muted-foreground">Select administrator role:</Label>
                  <RadioGroup
                    value={typeof jobActive === "string" ? jobActive : ""}
                    onValueChange={handleAdminChange}
                    className="space-y-2"
                  >
                    {AdministratorHire.map((option) => (
                      <div key={option.key} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.key} id={`admin-${option.key}`} />
                        <Label htmlFor={`admin-${option.key}`} className="text-sm cursor-pointer">
                          {option.value}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
            </div>
          </RadioGroup>

          {/* Error Messages */}
          {errors?.job_role && touched?.job_role && <p className="text-sm text-destructive">{errors.job_role}</p>}
          {errors?.job_active && touched?.job_active && <p className="text-sm text-destructive">{errors.job_active}</p>}
        </div>
      </CardContent>
    </Card>
  )
}
