import React, { useEffect, useState } from "react";
import { useUpdateTaskMutation } from "../store/api";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "./ui/dialog";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { taskValidationSchema } from "@/validation/validationSchema";
import { X } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Task } from "@/types";

const UpdateTask: React.FC<{ task: Task }> = ({ task }) => {
  const [updateTask, { isLoading, isError }] = useUpdateTaskMutation();
  const [initialValues, setInitialValues] = useState<{
    description: string;
    from: Date | null;
    to: Date | null;
  }>({
    description: "",
    from: null,
    to: null,
  });

  useEffect(() => {
    if (task) {
      setInitialValues({
        description: task.description,
        from: new Date(task.from as string),
        to: new Date(task.to as string),
      });
    }
  }, [task]);

  const handleSubmit = async (
    values: {
      description: string;
      from: Date | null;
      to: Date | null;
    },
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      await updateTask({
        id: task._id,
        data: { employee: task.employee, ...values },
      }).unwrap();
      resetForm();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={isLoading} variant={"outline"} className="w-full">
          Edit Task
        </Button>
      </DialogTrigger>
      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-80" />
      <DialogContent className="fixed p-6 bg-white rounded-lg shadow-md sm:max-w-[425px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col gap-4 justify-center items-center">
          <DialogClose className="flex justify-end w-full">
            <X className="h-6 w-6" />
          </DialogClose>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Update Task</DialogTitle>
          </DialogHeader>
          <DialogDescription></DialogDescription>

          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={taskValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, values, isSubmitting }) => (
              <Form className="w-[400px] flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Field
                    value={values.description}
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
                  <Label htmlFor="from">From:</Label>
                  <DatePicker
                    selected={values.from}
                    onChange={(date) => setFieldValue("from", date)}
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
                  <Label htmlFor="to">To:</Label>
                  <DatePicker
                    selected={values.to}
                    onChange={(date) => setFieldValue("to", date)}
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
                    {isSubmitting || isLoading ? "Updating..." : "Update Task"}
                  </Button>
                  {isError && (
                    <div className="mt-3 text-red-500 text-center text-lg">
                      Error updating task. Please try again.
                    </div>
                  )}
                </DialogFooter>
              </Form>
            )}
          </Formik>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTask;
