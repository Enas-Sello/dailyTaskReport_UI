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
    .min(5, "Description must be at least 5 characters long"),
  from: Yup.date().required("Start date and time are required"),
  to: Yup.date()
    .required("End date and time are required")
    .min(
      Yup.ref("from"),
      "End date and time can't be before start date and time"
    )
    .test(
      "maxDuration",
      "Task duration can't exceed 8 hours",
      function (value) {
        const { from } = this.parent
        if (from && value) {
          const start = new Date(from)
          const end = new Date(value)
          const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60)
          return duration <= 8
        }
        return true
      }
    )
    .test(
      "totalDuration",
      "Total task duration for the day can't exceed 8 hours",
      function (value) {
        const { from } = this.parent
        if (from && value) {
          const start = new Date(from)
          const end = new Date(value)
          const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60)
          const tasksForDay: any[] = [
            /* add logic to fetch tasks for the day */
          ]
          const totalDurationForDay = tasksForDay.reduce((sum, task) => {
            const taskStart = new Date(task.from)
            const taskEnd = new Date(task.to)
            return (
              sum + (taskEnd.getTime() - taskStart.getTime()) / (1000 * 60 * 60)
            )
          }, duration)
          return totalDurationForDay <= 8
        }
        return true
      }
    ),
})