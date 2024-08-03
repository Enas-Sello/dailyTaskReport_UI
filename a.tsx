import React from "react"
import { useCreateTaskMutation } from "../store/api"
import { DialogTitle } from "@radix-ui/react-dialog"
import { DialogFooter, DialogHeader } from "./ui/dialog"
import { Formik, Field, Form, ErrorMessage } from "formik"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { taskValidationSchema } from "@/validation/validationSchema"

const CreateTask: React.FC<{ employeeId: string; onClose: ()=> void }> = ({
  employeeId,
  onClose,
  }) => {
  const [createTask, { isLoading, isError }] = useCreateTaskMutation()

  const handleSubmit = async (
  values: { description: string; from: string; to: string },
  { resetForm }: { resetForm: () => void }
  ) => {
  try {
  await createTask({ ...values, employee: employeeId }).unwrap()
  alert("Task created successfully")
  resetForm()
  onClose() // Close the dialog after successful task creation
  } catch (error) {
  console.error("Failed to create task:", error)
  alert("Failed to create task")
  }
  }

  return (
  <div className="flex flex-col gap-4 justify-center items-center">
    <DialogHeader>
      <DialogTitle className="text-xl font-bold">Add New Task</DialogTitle>
    </DialogHeader>

    <Formik initialValues={{ description: "", from: "", to: "" }} validationSchema={taskValidationSchema}
      onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
      <Form className="w-[400px] flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="description">Description</Label>
          <Field as={Input} type="text" name="description" placeholder="Task Description" />
          <ErrorMessage name="description" component="div" className="text-red-600" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="from">From</Label>
          <Field as={Input} type="datetime-local" name="from" className="rounded-md border border-gray-300 p-2" />
          <ErrorMessage name="from" component="div" className="text-red-600" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="to">To</Label>
          <Field as={Input} type="datetime-local" name="to" className="rounded-md border border-gray-300 p-2" />
          <ErrorMessage name="to" component="div" className="text-red-600" />
        </div>
        <DialogFooter>
          <Button className="w-full" type="submit" disabled={isSubmitting || isLoading}>
            {isSubmitting || isLoading ? "Creating..." : "Create Task"}
          </Button>
          {isError && (
          <div className="mt-3 text-red-500 text-center text-lg">
            Error creating task. Please try again.
          </div>
          )}
        </DialogFooter>
      </Form>
      )}
    </Formik>
  </div>
  )
  }

  export default CreateTask
