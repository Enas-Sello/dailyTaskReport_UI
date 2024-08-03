import * as Yup from "yup"

const nameValidation = Yup.string()
  .required("Name is required")
  .min(3, "Name must be at least 3 characters long")

export const signUpValidationSchema = Yup.object({
  name: nameValidation,
})

export const loginValidationSchema = Yup.object({
  name: nameValidation,
})
