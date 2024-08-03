import React, { useState } from "react"
import { useCreateTaskMutation } from "../store/api"

const CreateTask: React.FC<{ employeeId: string }> = ({ employeeId }) => {
  const [createTask] = useCreateTaskMutation()
  const [description, setDescription] = useState("")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createTask({ description, from, to, employee: employeeId }).unwrap()
      alert("Task created successfully")
    } catch (error) {
      console.error("Failed to create task:", error)
      alert("Failed to create task")
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 mb-4 bg-white border-2 rounded"
    >
      <div>
        <label>Description</label>
        <input
          className="p-2 mb-4 border-2 rounded"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>From</label>
        <input
          className="p-2 mb-4 border-2 rounded"
          type="datetime-local"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          required
        />
      </div>
      <div>
        <label>To</label>
        <input
          className="p-2 mb-4 border-2 rounded"
          type="datetime-local"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />
      </div>
      <button
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
        type="submit"
      >
        Create Task
      </button>
    </form>
  )
}

export default CreateTask
