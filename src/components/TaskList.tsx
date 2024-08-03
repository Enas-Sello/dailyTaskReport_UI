import React, { useState } from "react"
import { useDeleteTaskMutation } from "../store/api"
import { Employee } from "@/types"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button"
import DateTransform from "@/utils/DateTransform"
import UpdateTask from "./UpdateTask"

const TaskList: React.FC<{ employee: Employee }> = ({ employee }) => {
  const [deleteTask, { isLoading, isError }] = useDeleteTaskMutation()
  const [loadingTaskId, setLoadingTaskId] = useState<string | null>(null)
  const [errorTaskId, setErrorTaskId] = useState<string | null>(null)

  const handleDelete = async (taskId: string) => {
    setLoadingTaskId(taskId)
    setErrorTaskId(null)
    try {
      await deleteTask({ id: taskId, employeeID: employee._id }).unwrap()
    } catch (error) {
      setErrorTaskId(taskId)
    } finally {
      setLoadingTaskId(null)
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {employee &&
        employee.tasks?.map((task) => (
          <Card key={task._id} className="mb-2">
            <CardHeader>
              <CardTitle> {task.description}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">
                From:{" "}
                <span className="text-gray-600">
                  {DateTransform(task.from as string)}
                </span>
              </p>
              <p>
                To:{" "}
                <span className="text-gray-600">
                  {DateTransform(task.to as string)}
                </span>
              </p>
            </CardContent>
            <CardFooter>
              <div className="flex items-center w-full justify-center gap-4">
                <UpdateTask taskId={task._id} />
                <Button
                  className="w-full"
                  onClick={() => handleDelete(task._id)}
                  variant={"destructive"}
                  disabled={isLoading && loadingTaskId === task._id}
                >
                  {isLoading && loadingTaskId === task._id
                    ? "Loading..."
                    : "Delete"}
                </Button>
              </div>
              {isError && errorTaskId === task._id && (
                <p className="mt-3 text-red-500 text-center text-lg">
                  Error Deleting task
                </p>
              )}
            </CardFooter>
          </Card>
        ))}
    </div>
  )
}

export default TaskList
