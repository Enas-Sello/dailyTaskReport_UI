import React from "react"
import TaskList from "./TaskList"
import CreateTask from "./CreateTask"
import DailySummary from "./DailySummary"
import { Employee } from "@/types"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogOverlay,
  DialogTitle,
} from "@radix-ui/react-dialog"
import { DialogHeader } from "./ui/dialog"

const Dashboard: React.FC<{ employee: Employee }> = ({ employee }) => {
  return (
    <div className="flex flex-col gap-8 p-6">
      <div>
        <h1 className=" text-2xl font-bold">
          Welcome,{" "}
          <span className="text-blue-500 capitalize">{employee.name} </span>
        </h1>
        <h2 className="text-2xl font-bold">your Daily Tasks Report</h2>
      </div>
      <div>
        <div className="flex items-end justify-end gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add New Task</Button>
            </DialogTrigger>
            <DialogOverlay className="fixed inset-0 bg-black bg-opacity-80" />

            <DialogContent className="fixed p-6 bg-white rounded-lg shadow-md sm:max-w-[425px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <CreateTask employeeId={employee._id} />
            </DialogContent>
          </Dialog>
          {/*  */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"outline"}>Daily Summary</Button>
            </DialogTrigger>
            <DialogOverlay className="fixed inset-0 bg-black bg-opacity-80" />
            <DialogContent className="fixed p-6 bg-white rounded-lg shadow-md sm:max-w-[425px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">
                  Daily Summary
                </DialogTitle>
              </DialogHeader>
              <DailySummary
                employeeId={employee._id}
                date={new Date().toISOString().split("T")[0]}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <TaskList employee={employee} />
    </div>
  )
}

export default Dashboard
