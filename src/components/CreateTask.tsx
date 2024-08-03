import React from "react"
import { useCreateTaskMutation } from "../store/api"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog"
import { DialogFooter, DialogHeader } from "./ui/dialog"
import { Formik, Field, Form, ErrorMessage } from "formik"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { taskValidationSchema } from "@/validation/validationSchema"
import { X } from "lucide-react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const CreateTask: React.FC<{ employeeId: string }> = ({ employeeId }) => {
  const [createTask, { isLoading, isError }] = useCreateTaskMutation()

  const handleSubmit = async (
    values: { description: string; from: Date | null; to: Date | null },
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      await createTask({ ...values, employee: employeeId }).unwrap()
      resetForm()
    } catch (error) {
      console.error("Failed to create task:", error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add New Task</Button>
      </DialogTrigger>
      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-80" />
      <DialogContent className="fixed p-6 bg-white rounded-lg shadow-md sm:max-w-[425px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col gap-4 justify-center items-center">
          <DialogClose className="flex justify-end w-full">
            <X className="h-6 w-6" />
          </DialogClose>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Add New Task
            </DialogTitle>
          </DialogHeader>
          <DialogDescription></DialogDescription>

          <Formik
            initialValues={{ description: "", from: null, to: null }}
            validationSchema={taskValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, values, isSubmitting }) => (
              <Form className="w-[400px] flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Field
                    as={Input}
                    type="text"
                    name="description"
                    placeholder="Task Description"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="from">From : </Label>
                  <DatePicker
                    placeholderText="when you want to start the task"
                    selected={(values.from as unknown as Date) || null}
                    onChange={(date: Date | null) =>
                      setFieldValue("from", date)
                    }
                    showTimeSelect
                    dateFormat="Pp"
                    className="form-input border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  />
                  <ErrorMessage
                    name="from"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="to">To : </Label>
                  <DatePicker
                    placeholderText="when you want to end the task"
                    selected={(values.to as unknown as Date) || null}
                    onChange={(date: Date | null) => setFieldValue("to", date)}
                    showTimeSelect
                    dateFormat="Pp"
                    className="form-input border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  />
                  <ErrorMessage
                    name="to"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <DialogFooter>
                  <Button
                    className="w-full"
                    type="submit"
                    disabled={isSubmitting || isLoading}
                  >
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
      </DialogContent>
    </Dialog>
  )
}

export default CreateTask
