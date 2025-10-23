import * as Yup from "yup"

export const assessmentValidationSchema = Yup.object().shape({
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
        type: Yup.string().required("Content type is required"),
        content: Yup.string().required("Content is required"),
        title: Yup.string().required("Content title is required"),
      }),
    )
    .min(1, "At least one introduction content is required"),
})
