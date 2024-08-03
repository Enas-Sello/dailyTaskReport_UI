import React from "react"
import { useDeleteTaskMutation } from "../store/api"
import { Task } from "@/types"

const TaskList: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
  console.log("tasks", tasks)

  const [deleteTask, { isLoading, isError }] = useDeleteTaskMutation()

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading tasks</div>

  const handleDelete = async (taskId: string) => {
    await deleteTask(taskId)
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Your Tasks</h2>
      {tasks?.map((task) => (
        <div key={task.id} className="p-2 mb-2 bg-white border-2 rounded">
          <h3 className="text-lg">{task.description}</h3>
          <p>
            From: {new Date(task.from).toLocaleString()} - To:{" "}
            {new Date(task.to).toLocaleString()}
          </p>
          <button
            className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-700"
            onClick={() => handleDelete(task.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default TaskList
