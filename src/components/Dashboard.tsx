import React from "react"
import TaskList from "./TaskList"
// import CreateTask from "./CreateTask"
// import DailySummary from "./DailySummary"
import { Employee } from "@/types"

const Dashboard: React.FC<{ employee: Employee }> = ({ employee }) => {
  console.log("employee", employee)
  return (
    <div className="p-4 bg-gray-100">
      <h1 className="mb-4 text-2xl font-bold">Welcome, {employee.name}</h1>
      <TaskList tasks={employee.tasks} />
      {/* <CreateTask employeeId={employee.name} /> */}
      {/* <DailySummary
        employeeId={employee._id}
        date={new Date().toISOString().split("T")[0]}
      /> */}
    </div>
  )
}

export default Dashboard
