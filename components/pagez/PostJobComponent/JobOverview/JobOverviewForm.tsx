'use client'
import { regularFont } from '@/assets/fonts/fonts'
import CounterInput from '@/components/Form/CounterInput/CounterInput'
import DateInput from '@/components/Form/DateInput/DateInput'
import StyledInput from '@/components/Form/NomalInput/StyledInput'
import { SelectInput } from '@/components/Form/SelectInput/SelectInput'
import StyledTextarea from '@/components/Form/TextareaInput/StyledTextarea'
import { degree, expL } from '@/utils/data'
import { Field, FieldArray, Form, Formik } from 'formik'
import { Button as ShadBtn } from "@/components/ui/button"

import React from 'react'
import { jobValidationSchema } from '../Schema/JobValidationSchema'
import Button from '@/components/Button/Button'
import JobRadioComponent from '@/components/Form/JobRadioComponent/JobRadioComponent'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Loader2, Plus, Trash2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { RichTextEditor } from '@/components/rich-text-editor'
import { Badge } from '@/components/ui/badge'
import { useJeloGroup } from '../../hooks/use-jelo-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Axios } from '@/request/request'
import { useRouter } from 'next/router'
import { debounce } from "lodash"
dayjs.extend(utc)
dayjs().utcOffset('local')

const questionTypes = [
  { value: "TEXT", key: "TEXT" },
  { value: "VIDEO", key: "VIDEO" },
  { value: "AUDIO", key: "AUDIO" },
]


const JobOverviewForm: React.FC<{ SW: any }> = ({ SW }) => {
  const queryClient = useQueryClient()
  const { groups, addGroup } = useJeloGroup()
  const [showNewGroupInput, setShowNewGroupInput] = React.useState(false)
  const [newGroupName, setNewGroupName] = React.useState("")
  const [checkingTitle, setCheckingTitle] = React.useState(false)
  const [titleUnique, setTitleUnique] = React.useState<boolean | null>(null)
  const school = queryClient.getQueryData(['school']) as any
  const idz = queryClient.getQueryData(['schId'])
  const params = useRouter()
  const isDuplicate = params.query?.duplicate
  const isEdit = params.query?.edit


  const { data: job } = useQuery({
    queryKey: ["edit_job"],
    queryFn: () => queryClient.getQueryData(["edit_job"]) as any,
    enabled: false,
  })

  const { data: assessmentData } = useQuery({
    queryKey: ["assessmentData"],
    queryFn: async () => {
      const req = await Axios.get(`/assesement/jelo/${job.assessmentId}?orgId=${idz ?? school?.sch_id}`)
      return req.data.assessment
    },
    enabled: !!job?.assessmentId,
  })

  const handleSubmit = (values: any) => {
    if(!isEdit) {
      if (values.enable_assessment && titleUnique === false) {
        alert("Assessment title must be unique before proceeding.")
        return
      }
    }
    SW.next()

    // setJobData(() => values);
    queryClient.setQueryData(['jobData'], values)
    const time = setTimeout(() => {
      if (typeof document !== 'undefined') {
        const doc = document.querySelector('.ant-layout-content')
        doc?.scrollTo({
          behavior: 'smooth',
          top: 0,
        })
      }
      clearTimeout(time)
    }, 1500)
  }

  const handleAddGroup = async (setFieldValue: any) => {
    if (!newGroupName.trim()) return
    const newGroup = await addGroup({ name: newGroupName })
    setFieldValue("assessment.groupId", newGroup.id) // auto-select new group
    setNewGroupName("")
    setShowNewGroupInput(false)
  }

  const checkTitleUnique = React.useCallback(
    debounce(async (title: string) => {
      if (!title.trim()) {
        setTitleUnique(null)
        return
      }

      try {
        setCheckingTitle(true)
        const res = await Axios.get(`/job/check-title?title=${encodeURIComponent(title)}&orgId=${idz ?? school?.sch_id}`)
        setTitleUnique(res.data.unique)
      } catch (error) {
        setTitleUnique(null)
      } finally {
        setCheckingTitle(false)
      }
    }, 600),
    []
  )



  return (
    <div className="w-full">
      <Formik
        validateOnMount={false}
        initialValues={{
          job_title: job?.job_title ?? "",
          job_role: job?.job_role ?? "",
          job_active: job?.job_active ?? (job?.job_role === "teacher" ? [] : ""),
          job_exp: job?.job_exp ?? "",
          job_qual: job?.job_qual ?? "",
          job_desc: job?.job_desc ?? "",
          job_min_sal: job?.job_min_sal ?? "",
          job_max_sal: job?.job_max_sal ?? "",
          job_resumption: job?.job_resumption ? job.job_resumption.split("T")[0] : "",
          job_no_hires: job?.job_no_hires ?? "1",
          assessmentId: job?.assessmentId ?? null,
          enable_assessment: !!job?.assessmentId,
          assessment: {
            title: assessmentData?.title ?? "",
            description: assessmentData?.description ?? "",
            groupId: assessmentData?.groupId ?? "",
            hasDuration: assessmentData?.hasDuration ?? false,
            duration: assessmentData?.duration ?? 15,
            hasDeadline: assessmentData?.hasDeadline ?? false,
            deadline: assessmentData?.deadline ? dayjs(assessmentData.deadline).format("YYYY-MM-DD") : "",
            proctored: assessmentData?.proctored ?? false,
            status: assessmentData?.status ?? 'LIVE',
            questions: assessmentData?.questions ?? [
              {
                prompt: "",
                type: "TEXT",
                maxCharacters: +"500",
                instructions: "",
                hasDuration: false,
                totalDuration: 10,
                duration: 10,
                maxRetries: 0,
                order: 1,
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
          }
        }}
        onSubmit={() => { }}
        validationSchema={jobValidationSchema}
        enableReinitialize
        key={0}
      >
        {({ values, isValid, setFieldValue, errors }) => {
          React.useEffect(() => {
            if (values.enable_assessment) {
             
                checkTitleUnique(values.assessment.title)
              
            }
          }, [values.assessment.title, checkTitleUnique, values.enable_assessment])
          return <Form className="mt-[20px] pb-[100px] w-full">
            <div>
              <h3
                className={`mb-[14px] ml-1 text-[20px] text-center text-black ${regularFont.className}`}
              >
                Select Teacher or Administrator?
              </h3>
              <Field
                name="job_role"
                as={JobRadioComponent}
                name2={'job_active'}
              />
            </div>
            <div className='-space-y-4'>
              <div>
                <h3 className="mb-[10px] ml-1 text-black">Job Title</h3>
                <Field
                  name="job_title"
                  as={StyledInput}
                  placeholder="Job title"
                  type={'text'}
                  maxLength={100}
                />
              </div>
              <div>
                <h3 className="mb-[10px] ml-1 text-black">
                  Minimum educational qualification
                </h3>
                <Field
                  name="job_qual"
                  as={SelectInput}
                  placeholder="Minimum educational qualification"
                  text="Minimum educational qualification"
                  option={degree}
                />
              </div>
              <div>
                <h3 className="mb-[10px] ml-1 text-black">
                  Minimum years of experience
                </h3>
                <Field
                  name="job_exp"
                  as={SelectInput}
                  placeholder="Minimum years of experience"
                  text="Minimum years of experience"
                  option={expL}
                />
              </div>
              <div className="mb-5">
                <h3 className={`mb-[30px] ml-1 ${regularFont.className}`}>
                  Salary details
                </h3>
                <div
                  className={`grid md:grid-cols-12 grid-cols-6 md:gap-5 ${values?.job_max_sal || values?.job_min_sal ? 'mt-8' : 'mt-0'
                    }`}
                >
                  <div className="col-span-6">
                    <Field
                      name="job_min_sal"
                      as={StyledInput}
                      placeholder="Minimum amount"
                      type={'num'}
                      text={'Minimum amount'}
                    />
                  </div>
                  <div className="col-span-6 md:mt-0">
                    <Field
                      name="job_max_sal"
                      as={StyledInput}
                      placeholder="Maximum amount"
                      type={'num'}
                      text={'Maximum amount'}
                    />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="mb-[10px] ml-1 text-black">
                  Application deadline
                </h3>
                <Field
                  name="job_resumption"
                  as={DateInput}
                  picker="date"
                  placeholder="MM/DD/YYYY"
                  minDate={dayjs(new Date(Date.now()).toISOString(), 'YYYY-MM-DD')}
                  defaultValue={dayjs(values?.job_resumption).isValid() ? dayjs(values?.job_resumption, 'YYYY-MM-DD') : undefined}
                />
              </div>

              <div>
                <h3 className="mb-[10px] ml-1 text-black">
                  How many hires do you need for this role ?
                </h3>
                <Field
                  name="job_no_hires"
                  as={CounterInput}
                  type={'num'}
                  disabled
                />
              </div>
              <div>
                <h3 className="mb-[10px] ml-1 text-black">
                  Other details (Optional)
                </h3>
                <Field
                  name="job_desc"
                  as={StyledTextarea}
                  placeholder="What else would like applicants to know about this vacancy and/or your school?"
                  rows={5}
                  spellCheck="false"
                />
              </div>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="enable_assessment"
                      checked={values.enable_assessment}
                      onCheckedChange={(checked) => setFieldValue("enable_assessment", checked)}
                      disabled={isEdit ? true : false}
                    />
                    <div className="space-y-1">
                      <Label htmlFor="enable_assessment" className="font-medium">
                        Add Assessment
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Include a custom assessment for applicants to complete
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            {values.enable_assessment ?
              <div>

                <Card className='mt-12 border-0'>
                  <CardContent className="space-y-4 mx-0 px-0 w-full">
                    <div>
                      <Field
                        name="assessment.title"
                        as={StyledInput}
                        placeholder="Enter assessment title"
                        type={'text'}
                        text={'Assessment Title'}
                        maxLength={100}
                        disabled={isEdit ? true : false}
                      />
                      {isEdit ? null : checkingTitle ? (
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-6">
                          <Loader2 className="w-3 h-3 animate-spin" /> Checking availability...
                        </p>
                      ) : titleUnique === false ? (
                        <p className="text-xs text-red-600 -mt-6">❌ This title already exists.</p>
                      ) : titleUnique === true ? (
                        <p className="text-xs text-green-600 -mt-6">✅ Title is available.</p>
                      ) : null}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="group">Assessment Group *</Label>
                      <span className="text-xs text-foreground">Grouping allows you to organize similar assessments</span>

                      <div className="space-y-3 mb-8 mx-1">
                        {!groups.length ? (
                          <div className="text-xs border p-2 italic rounded-lg text-red-600">
                            Create group to proceed
                          </div>
                        ) : (
                          <Select
                            value={values.assessment.groupId || undefined}
                            onValueChange={(val) => setFieldValue("assessment.groupId", val)}
                            disabled={isEdit ? true : false}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select group *" />
                            </SelectTrigger>
                            <SelectContent>
                              {groups.map((group: any) => (
                                <SelectItem key={group.id} value={group.id}>
                                  {group.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}

                        {showNewGroupInput ? (
                          <div className="flex gap-2 mx-1">
                            <Input
                              placeholder="Enter group name"
                              value={newGroupName}
                              onChange={(e) => setNewGroupName(e.target.value)}
                              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddGroup(setFieldValue))}
                              disabled={isEdit ? true : false}
                            />
                            <ShadBtn disabled={isEdit ? true : false} type="button" size="sm" onClick={() => handleAddGroup(setFieldValue)}>Add</ShadBtn>
                            <ShadBtn disabled={isEdit ? true : false} variant="outline" type="button" size="sm" onClick={() => setShowNewGroupInput(false)}>Cancel</ShadBtn>
                          </div>
                        ) : (
                          <ShadBtn disabled={isEdit ? true : false} variant="outline" type="button" size="sm" onClick={() => setShowNewGroupInput(true)}>
                            <Plus className="h-4 w-4 mr-2" /> Create New Group
                          </ShadBtn>
                        )}
                      </div>
                    </div>
                    <div>

                      <Field
                        name="assessment.description"
                        as={StyledTextarea}
                        placeholder="Describe what this assessment evaluates"
                        rows={5}
                        spellCheck="false"
                        text={'Assessment Description'}
                        disabled={isEdit ? true : false}
                      />

                    </div>


                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="assessment.hasDuration"
                            checked={values.assessment.hasDuration}
                            onCheckedChange={(checked) => setFieldValue("assessment.hasDuration", checked)}
                            disabled={isEdit ? true : false}
                          />
                          <Label htmlFor="hasDuration">Set duration for assessment</Label>
                        </div>
                        {values.assessment.hasDuration && (
                          <div className="items-center space-y-3 px-1">
                            <Label className='block'>Duration</Label>
                            <p className="text-xs text-muted-foreground w-full">
                              Total time (in minutes) the candidate has to complete the assessment.
                            </p>

                            <Field name="assessment.duration" disabled={isEdit ? true : false}>
                              {({ field }: any) => <Input {...field} type="number" min="1" max="180" className="w-full" />}
                            </Field>

                          </div>

                        )}
                      </div>


                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="proctored"
                        checked={values.assessment.proctored}
                        onCheckedChange={(checked) => setFieldValue("assessment.proctored", checked)}
                        disabled={isEdit ? true : false}
                      />
                      <Label htmlFor="proctored">Enable proctoring</Label>
                    </div>
                    {values.assessment.proctored ? (
                      <p className="text-sm text-muted-foreground">
                        Responders’ actions will be monitored and reported to you for integrity evaluation. Not suitable if your
                        responders do not have access to a personal computer (PC).
                      </p>
                    ) : null}
                  </CardContent>
                </Card>

                {/* Questions */}
                <Card className='border-0 shadow-none mx-0 px-0'>
                  <CardHeader className='border-0 shadow-none mx-0 px-0'>
                    <CardTitle>Assessment Questions</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Add and configure questions for your assessment.
                    </p>
                  </CardHeader>
                  <CardContent className='border-dashed border-2 shadow-none mx-0 px-4 py-5 rounded-md '>
                    <FieldArray name="assessment.questions">
                      {({ push, remove }) => (
                        <div className="space-y-4">
                          {values.assessment.questions.map((_: any, index: number) => (
                            <Card key={index} className="border-0 shadow-none mx-0 px-0">
                              <Badge className='-translate-y-2' variant="outline">Question {index + 1}</Badge>
                              <CardContent className="pt-4 border-0 shadow-none mx-0 px-0">
                                <div className="flex justify-end items-center mb-3">
                                  {values.assessment.questions.length > 1 && (
                                    <ShadBtn disabled={isEdit ? true : false} type="button" onClick={() => remove(index)}>
                                      <Trash2 className="h-4 w-4" />
                                    </ShadBtn>
                                  )}
                                </div>

                                <div className="">

                                  <Field
                                    name={`assessment.questions.${index}.prompt`}
                                    as={StyledTextarea}
                                    placeholder="Enter your question"
                                    rows={5}
                                    spellCheck="false"
                                    text={'Question Prompt *'}
                                    disabled={isEdit ? true : false}
                                  />


                                  <div className="">
                                    <div>
                                      <h3 className="mb-1 font-bold ml-1 text-black">
                                        Response Type *
                                      </h3>
                                      <Field
                                        name={`assessment.questions.${index}.type`}
                                        as={SelectInput}
                                        placeholder="Content type"
                                        text="Response Type"
                                        option={questionTypes}
                                        disabled={isEdit ? true : false}
                                      />

                                    </div>


                                    {values.assessment.questions[index].type === "TEXT" ? (
                                      <div className="">
                                        <Label className='font-bold inline-block mb-1 ml-0.5'>Max Characters *</Label>
                                        <Field name={`assessment.questions.${index}.maxCharacters`} disabled={isEdit ? true : false}>
                                          {({ field }: any) => <Input {...field} type="number" min="1" max="5000" className="w-full" />}
                                        </Field>

                                      </div>
                                    ) : null}


                                    <div className="mt-10">
                                      <div className="flex items-center space-x-2">
                                        <Checkbox
                                          id={`questions.${index}.hasDuration`}
                                          checked={values.assessment.questions[index]?.hasDuration}
                                          onCheckedChange={(checked) =>
                                            setFieldValue(`assessment.questions.${index}.hasDuration`, checked)
                                          }
                                          disabled={isEdit ? true : false}
                                        />
                                        <Label htmlFor={`assessment.questions.${index}.hasDuration`} className="text-sm">
                                          Set duration for this question
                                        </Label>
                                      </div>
                                      {values.assessment.questions[index]?.hasDuration && (

                                        <div className="mt-2 space-y-2">
                                          <Label className='block'>Duration</Label>
                                          <span className="text-xs block text-muted-foreground">
                                            Total time allotted for answering this {values.assessment.questions[index].type.toLowerCase()} question (in minutes).
                                          </span>
                                          <Field name={`assessment.questions.${index}.duration`} >
                                            {({ field }: any) => <Input {...field} type="number" disabled={isEdit ? true : false} min="1" max="180" className="w-full" />}
                                          </Field>

                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {values.assessment.questions[index].type !== "TEXT" ? <div className='my-10'>

                                    <Label className='inline-block mb-1 ml-0.5 font-bold'>Maximum Retries - Optional</Label>

                                    <Field name={`assessment.questions.${index}.maxRetries`} >
                                      {({ field }: any) => <Input {...field} disabled={isEdit ? true : false} type="number" min="1" max="5" className="w-full" />}
                                    </Field>
                                    <span className="text-sm text-muted-foreground">
                                      Set how many times candidates can retry this question. Leave empty for no retries.
                                    </span>


                                  </div> : null}

                                  <div className='mt-16'>
                                    <Field
                                      name={`assessment.questions.${index}.instructions`}
                                      as={StyledTextarea}
                                      placeholder="Additional instructions for this question"
                                      rows={5}
                                      spellCheck="false"
                                      text="Instructions (Optional)"
                                      disabled={isEdit ? true : false}
                                    />

                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}

                          <ShadBtn
                            type="button"
                            disabled={isEdit ? true : false}
                            onClick={() =>
                              push({
                                prompt: "",
                                type: "TEXT",
                                maxCharacters: +"500",
                                instructions: "",
                                hasDuration: false,
                                totalDuration: 10,
                                duration: 10,
                                maxRetries: 0,
                                order: values.assessment.questions.length + 1,

                              })
                            }
                            className="w-full"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Question
                          </ShadBtn>
                        </div>
                      )}
                    </FieldArray>
                  </CardContent>
                </Card>

                {/* Introduction Content */}
                <Card className='border-0 px-0 mx-0 shadow-none'>
                  <CardHeader className='border-0 px-0 mx-0 shadow-none'>
                    <CardTitle>Introduction Content</CardTitle>

                    <p className="text-sm text-muted-foreground max-w-sm">
                      Create the landing page that candidates will see when they access
                      the assessment.
                    </p>
                  </CardHeader>
                  <CardContent className='border-0 px-0 mx-0 shadow-none'>
                    <FieldArray name="assessment.introContent" >
                      {({ }) => (
                        <div className="space-y-4">
                          {values.assessment.introContent.map((_: any, index: number) => (
                            <Card key={index} className="border-dashed">
                              <CardContent className="pt-4 px-0 mx-0 border-none">

                                <div>
                                  <h3 className="mb-[10px] ml-1 text-black">
                                    Content
                                  </h3>
                                  <Field
                                    name={`assessment.introContent.${index}.content`}
                                    disabled={isEdit ? true : false}
                                  >
                                    {({ field }: any) => <RichTextEditor
                                      {...field}
                                      value={values.assessment.introContent[index].content}
                                      onChange={(value) => setFieldValue(`assessment.introContent.${index}.content`, value)}
                                      placeholder="Enter your content..."
                                      disabled={isEdit ? true : false}
                                    />}
                                  </Field>

                                </div>
                              </CardContent>
                            </Card>
                          ))}

                        </div>
                      )}
                    </FieldArray>
                  </CardContent>
                </Card>


              </div>
              : null}
            <div className="text-center mt-20">

              <Button
                disabled={!isValid || (!isEdit && titleUnique === false)}
                bold={false}
                hover={isValid}
                text={'Preview'}
                render="light"
                onClick={() => handleSubmit(values)}
                type="button"
              />
            </div>
          </Form>
        }}
      </Formik>
    </div>
  )
}

export default JobOverviewForm
