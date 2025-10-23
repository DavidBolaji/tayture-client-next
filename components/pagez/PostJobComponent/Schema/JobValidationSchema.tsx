import * as Yup from "yup"

export const jobValidationSchema = Yup.object().shape({
  job_role: Yup.string().required('Job role category is required'),
  job_active: Yup.string().required('Job role name is required'),
  job_qual: Yup.string().required('Job qualification is required'),
  job_exp: Yup.string().required('Job experience is required'),
  job_resumption: Yup.string().required('Job resumption date is required'),
  job_title: Yup.string().required('Job title is required'),
  job_desc: Yup.string().notRequired(),
  job_min_sal: Yup.string().required("Salary is required"),
  job_max_sal: Yup.string()
    .required("Salary is required")
    .test("startYearBeforeEndYear", "Max salary must be greater than or equal Min salary", function (maxSal) {
      const minSal = +this.parent.job_min_sal
      return +maxSal! >= minSal
    }),
  job_no_hires: Yup.string()
    .required("No of hires is required")
    .test(
      "is-not-less-than-one",
      "Number of hires can't be less than one",
      (value) => typeof value !== "undefined" && +value > 0,
    ),
  assessmentId: Yup.string().nullable().notRequired(),
  enable_assessment: Yup.boolean().notRequired(),
  
  // Assessment object - conditionally validated when enable_assessment is true
  assessment: Yup.object().when("enable_assessment", {
    is: true,
    then: (schema) => schema.shape({
      title: Yup.string().required("Assessment title is required"),
      description: Yup.string().required("Assessment description is required"),
      hasDuration: Yup.boolean(),
      duration: Yup.number().when("hasDuration", {
        is: true,
        then: (schema) =>
          schema
            .min(1, "Duration must be at least 1 minute")
            .max(180, "Duration cannot exceed 180 minutes")
            .required("Duration is required when time limit is enabled"),
        otherwise: (schema) => schema.notRequired(),
      }),
      hasDeadline: Yup.boolean(),
      deadline: Yup.mixed().when("hasDeadline", {
        is: true,
        then: (schema) => schema.required("Deadline is required when deadline is enabled"),
        otherwise: (schema) => schema.notRequired(),
      }),
      proctored: Yup.boolean(),
      questions: Yup.array()
        .of(
          Yup.object().shape({
            prompt: Yup.string().required("Question prompt is required"),
            type: Yup.string().required("Question type is required"),
            instructions: Yup.string().notRequired(),
            hasDuration: Yup.boolean(),
            duration: Yup.number().when("hasDuration", {
              is: true,
              then: (schema) =>
                schema
                  .min(1, "Duration must be at least 1 minute")
                  .max(60, "Duration cannot exceed 60 minutes")
                  .required("Duration is required when time limit is enabled"),
              otherwise: (schema) => schema.notRequired(),
            }),
          }),
        )
        .min(1, "At least one question is required"),
      introContent: Yup.array()
        .of(
          Yup.object().shape({
            type: Yup.string().notRequired(),
            content: Yup.string().notRequired(),
            title: Yup.string().notRequired(),
          }),
        )
        .min(1, "At least one introduction content is required"),
    }),
    otherwise: (schema) => schema.notRequired(),
  }),
})