import { useCreateTaskMutation } from "@/store/api"
import React, { useState } from "react"

const CreateTask: React.FC = () => {
  const [createTask] = useCreateTaskMutation()
  const [description, setDescription] = useState("")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [employee, setEmployee] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createTask({ description, from, to, employee }).unwrap()
      alert("Task created successfully")
    } catch (error) {
      console.error("Failed to create task:", error)
      alert("Failed to create task")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Description</label>
        <input
          className="border-2"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>From</label>
        <input
          className="border-2"
          type="datetime-local"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          required
        />
      </div>
      <div>
        <label>To</label>
        <input
          className="border-2"
          type="datetime-local"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Employee</label>
        <input
          className="border-2"
          type="text"
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
          required
        />
      </div>
      <button className="border-2" type="submit">
        Create Task
      </button>
    </form>
  )
}

export default CreateTask
