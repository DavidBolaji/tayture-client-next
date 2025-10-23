"use client"
import type React from "react"
import { Field, Form, Formik, FieldArray } from "formik"
import { useQueryClient } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2 } from "lucide-react"
import dayjs from "dayjs"
import { assessmentValidationSchema } from "../Schema/AssessmentValidationSchema"

const questionTypes = [
  { value: "TEXT", label: "Text Response" },
  { value: "VIDEO", label: "Video Response" },
  { value: "AUDIO", label: "Audio Response" },
  { value: "FILE", label: "File Upload" },
]

const introContentTypes = [
  { value: "text", label: "Text Content" },
  { value: "video", label: "Video Content" },
  { value: "image", label: "Image Content" },
]

const JobAssessmentForm: React.FC<{ stepperProps?: any }> = ({ stepperProps }) => {
  const queryClient = useQueryClient()
  const assessmentData = queryClient.getQueryData(["assessmentData"]) as any
  const shouldShowAssessment = queryClient.getQueryData(["shouldShowAssessment"]) as boolean

  // If assessment should not be shown, don't render
  if (!shouldShowAssessment) {
    return null
  }

  const handleSubmit = (values: any) => {
    // Generate a unique assessment ID
    const assessmentId = `assessment_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`

    const assessmentWithId = {
      ...values,
      id: assessmentId,
      environment: "PRODUCTION",
      status: "DRAFT",
      groupId: null,
      questions: values.questions.map((q: any, index: number) => ({
        ...q,
        order: index + 1,
        totalDuration: q.hasDuration ? q.duration : null,
      })),
      introContent: values.introContent.map((content: any, index: number) => ({
        ...content,
        order: index + 1,
      })),
    }

    queryClient.setQueryData(["assessmentData"], assessmentWithId)

    // Update job data with assessment ID
    const jobData = queryClient.getQueryData(["jobData"]) as any
    queryClient.setQueryData(["jobData"], {
      ...jobData,
      assessmentId: assessmentId,
    })

    stepperProps?.next()
  }

  const goBack = () => {
    stepperProps?.prev()
  }

  return (
    <Formik
      validateOnMount={true}
      initialValues={{
        title: assessmentData?.title ?? "",
        description: assessmentData?.description ?? "",
        hasDuration: assessmentData?.hasDuration ?? false,
        duration: assessmentData?.duration ?? 15,
        hasDeadline: assessmentData?.hasDeadline ?? false,
        deadline: assessmentData?.deadline ? dayjs(assessmentData.deadline).format("YYYY-MM-DD") : "",
        proctored: assessmentData?.proctored ?? false,
        questions: assessmentData?.questions ?? [
          {
            prompt: "",
            type: "TEXT",
            totalDuration: 10,
            order: 1,
            instructions: "",
            hasDuration: false,
            duration: 10,
          },
        ],
        introContent: assessmentData?.introContent ?? [
          {
            type: "text",
            content: "",
            order: 1,
            title: "",
          },
        ],
      }}
      onSubmit={handleSubmit}
      validationSchema={assessmentValidationSchema}
      enableReinitialize
    >
      {({ values, isValid, setFieldValue, errors, touched }) => (
        <Form className="space-y-6">
          {/* Basic Assessment Info */}
          <Card>
            <CardHeader>
              <CardTitle>Assessment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Assessment Title</Label>
                <Field name="title">
                  {({ field }: any) => (
                    <Input {...field} id="title" placeholder="Enter assessment title" maxLength={100} />
                  )}
                </Field>
                {errors.title && touched.title && <p className="text-sm text-destructive">{errors.title as string}</p>}
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Field name="description">
                  {({ field }: any) => (
                    <Textarea
                      {...field}
                      id="description"
                      placeholder="Describe what this assessment evaluates"
                      rows={3}
                    />
                  )}
                </Field>
                {errors.description && touched.description && (
                  <p className="text-sm text-destructive">{errors?.description as string}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasDuration"
                      checked={values.hasDuration}
                      onCheckedChange={(checked) => setFieldValue("hasDuration", checked)}
                    />
                    <Label htmlFor="hasDuration">Set time limit</Label>
                  </div>
                  {values.hasDuration && (
                    <div className="flex items-center space-x-2">
                      <Field name="duration">
                        {({ field }: any) => <Input {...field} type="number" min="1" max="180" className="w-20" />}
                      </Field>
                      <span className="text-sm text-muted-foreground">minutes</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasDeadline"
                      checked={values.hasDeadline}
                      onCheckedChange={(checked) => setFieldValue("hasDeadline", checked)}
                    />
                    <Label htmlFor="hasDeadline">Set deadline</Label>
                  </div>
                  {values.hasDeadline && (
                    <Field name="deadline">
                      {({ field }: any) => <Input {...field} type="date" min={dayjs().format("YYYY-MM-DD")} />}
                    </Field>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="proctored"
                  checked={values.proctored}
                  onCheckedChange={(checked) => setFieldValue("proctored", checked)}
                />
                <Label htmlFor="proctored">Enable proctoring</Label>
              </div>
            </CardContent>
          </Card>

          {/* Introduction Content */}
          <Card>
            <CardHeader>
              <CardTitle>Introduction Content</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldArray name="introContent">
                {({ push, remove }) => (
                  <div className="space-y-4">
                    {values.introContent.map((_: any, index: number) => (
                      <Card key={index} className="border-dashed">
                        <CardContent className="pt-4">
                          <div className="flex justify-between items-center mb-3">
                            <Badge variant="outline">Content {index + 1}</Badge>
                            {values.introContent.length > 1 && (
                              <Button type="button" variant="outline" size="sm" onClick={() => remove(index)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                              <Label>Title</Label>
                              <Field name={`introContent.${index}.title`}>
                                {({ field }: any) => <Input {...field} placeholder="Content title" />}
                              </Field>
                            </div>
                            <div>
                              <Label>Type</Label>
                              <Select
                                value={values.introContent[index]?.type}
                                onValueChange={(value) => setFieldValue(`introContent.${index}.type`, value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Content type" />
                                </SelectTrigger>
                                <SelectContent>
                                  {introContentTypes.map((type) => (
                                    <SelectItem key={type.value} value={type.value}>
                                      {type.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div>
                            <Label>Content</Label>
                            <Field name={`introContent.${index}.content`}>
                              {({ field }: any) => (
                                <Textarea
                                  {...field}
                                  placeholder={
                                    values.introContent[index]?.type === "text"
                                      ? "Enter text content"
                                      : "Enter URL or file path"
                                  }
                                  rows={3}
                                />
                              )}
                            </Field>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        push({
                          type: "text",
                          content: "",
                          order: values.introContent.length + 1,
                          title: "",
                        })
                      }
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Introduction Content
                    </Button>
                  </div>
                )}
              </FieldArray>
            </CardContent>
          </Card>

          {/* Questions */}
          <Card>
            <CardHeader>
              <CardTitle>Assessment Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldArray name="questions">
                {({ push, remove }) => (
                  <div className="space-y-4">
                    {values.questions.map((_: any, index: number) => (
                      <Card key={index} className="border-dashed">
                        <CardContent className="pt-4">
                          <div className="flex justify-between items-center mb-3">
                            <Badge variant="outline">Question {index + 1}</Badge>
                            {values.questions.length > 1 && (
                              <Button type="button" variant="outline" size="sm" onClick={() => remove(index)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>

                          <div className="space-y-3">
                            <div>
                              <Label>Question</Label>
                              <Field name={`questions.${index}.prompt`}>
                                {({ field }: any) => <Textarea {...field} placeholder="Enter your question" rows={2} />}
                              </Field>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label>Response Type</Label>
                                <Select
                                  value={values.questions[index]?.type}
                                  onValueChange={(value) => setFieldValue(`questions.${index}.type`, value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Response type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {questionTypes.map((type) => (
                                      <SelectItem key={type.value} value={type.value}>
                                        {type.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`questions.${index}.hasDuration`}
                                    checked={values.questions[index]?.hasDuration}
                                    onCheckedChange={(checked) =>
                                      setFieldValue(`questions.${index}.hasDuration`, checked)
                                    }
                                  />
                                  <Label htmlFor={`questions.${index}.hasDuration`} className="text-sm">
                                    Time limit
                                  </Label>
                                </div>
                                {values.questions[index]?.hasDuration && (
                                  <div className="flex items-center space-x-2">
                                    <Field name={`questions.${index}.duration`}>
                                      {({ field }: any) => (
                                        <Input {...field} type="number" min="1" max="60" className="w-20" />
                                      )}
                                    </Field>
                                    <span className="text-xs text-muted-foreground">minutes</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div>
                              <Label>Instructions (Optional)</Label>
                              <Field name={`questions.${index}.instructions`}>
                                {({ field }: any) => (
                                  <Textarea
                                    {...field}
                                    placeholder="Additional instructions for this question"
                                    rows={2}
                                  />
                                )}
                              </Field>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        push({
                          prompt: "",
                          type: "TEXT",
                          totalDuration: 10,
                          order: values.questions.length + 1,
                          instructions: "",
                          hasDuration: false,
                          duration: 10,
                        })
                      }
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Question
                    </Button>
                  </div>
                )}
              </FieldArray>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={goBack}>
              Back
            </Button>
            <Button type="submit" disabled={!isValid} className="min-w-32">
              Continue to Preview
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default JobAssessmentForm
