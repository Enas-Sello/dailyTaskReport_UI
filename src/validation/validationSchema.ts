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


export const taskValidationSchema = Yup.object().shape({
  description: Yup.string()
    .required("Description is required")
    .min(3, "Description must be at least 3 characters long"),
  from: Yup.date()
    .required("Start date is required")
    .test("is-valid", "Start date must be a valid date", (value) => !isNaN(new Date(value).getTime())),
  to: Yup.date()
    .required("End date is required")
    .test("is-valid", "End date must be a valid date", (value) => !isNaN(new Date(value).getTime()))
    .min(Yup.ref("from"), "End date can't be before start date")
    .test("max-duration", "Task duration can't exceed 8 hours", function (value) {
      const { from } = this.parent;
      if (from && value) {
        const start = new Date(from);
        const end = new Date(value);
        const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
        return duration <= 8;
      }
      return true;
    }),
});


