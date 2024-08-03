import React from "react"
import TaskList from "./TaskList"
import CreateTask from "./CreateTask"
import DailySummary from "./DailySummary"
import { Employee } from "@/types"

const Dashboard: React.FC<{ employee: Employee }> = ({ employee }) => {
  console.log("employee", employee)
  return (
    <div className="flex flex-col gap-8 p-6">
      <div>
        <h1 className=" text-2xl font-bold">
          Welcome,{" "}
          <span className="text-blue-500 capitalize">{employee.name} </span>
        </h1>
        <h2 className="text-2xl font-bold">your Daily Tasks Report</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        <TaskList tasks={employee.tasks} />
        <CreateTask employeeId={employee.name} />
        
        <DailySummary
        employeeId={employee._id}
        date={new Date().toISOString().split("T")[0]}
      />
      </div>
    </div>
  )
}

export default Dashboard
