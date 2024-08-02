// src/components/AddTask.tsx
import React, { useState } from "react"
import { useCreateTaskMutation } from "../store/api"

const AddTask: React.FC = () => {
  const [description, setDescription] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [employee, setEmployee] = useState("")
  const [createTask, { isLoading, error }] = useCreateTaskMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createTask({ description, startTime, endTime, employee })
    setDescription("")
    setStartTime("")
    setEndTime("")
    setEmployee("")
  }

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div>
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2"
        />
      </div>
      <div>
        <label>Start Time</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="border p-2"
        />
      </div>
      <div>
        <label>End Time</label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="border p-2"
        />
      </div>
      <div>
        <label>Employee</label>
        <input
          type="text"
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
          className="border p-2"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 mt-2">
        {isLoading ? "Adding..." : "Add Task"}
      </button>
      {error && <p className="text-red-500">Error adding task</p>}
    </form>
  )
}

export default AddTask
