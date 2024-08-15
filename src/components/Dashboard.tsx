import React from "react";
import TaskList from "./TaskList";
import CreateTask from "./CreateTask";
import DailySummary from "./DailySummary";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const Dashboard: React.FC = () => {
  const employee = useSelector((state: RootState) => state.employee.employee);

  return (
    <>
      {employee && (
        <div className="flex flex-col gap-8 p-6">
          <div>
            <h1 className=" text-2xl font-bold">
              Welcome,{" "}
              <span className="text-blue-500 capitalize">
                {employee?.name}{" "}
              </span>
            </h1>
            <h2 className="text-2xl font-bold">your Daily Tasks Report</h2>
          </div>
          <div>
            <div className="flex items-end justify-end gap-4">
              <CreateTask employeeId={employee?._id} />

              <DailySummary
                employeeId={employee?._id}
                date={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>
          <TaskList />
        </div>
      )}
    </>
  );
};

export default Dashboard;
