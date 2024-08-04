import React, { useState } from "react";
import { useDeleteTaskMutation, useGetTasksQuery } from "../store/api";
import { Employee } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import DateTransform from "@/utils/DateTransform";
import UpdateTask from "./UpdateTask";
import PaginationComponent from "./Pagination";

const TaskList: React.FC<{ employee: Employee }> = ({ employee }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useGetTasksQuery({
    employeeId: employee._id,
    page: currentPage,
    limit: 10,
  });
  const [deleteTask] = useDeleteTaskMutation();
  const [loadingTaskId, setLoadingTaskId] = useState<string | null>(null);
  const [errorTaskId, setErrorTaskId] = useState<string | null>(null);

  const handleDelete = async (taskId: string) => {
    setLoadingTaskId(taskId);
    setErrorTaskId(null);
    try {
      await deleteTask({ id: taskId, employeeID: employee._id }).unwrap();
    } catch (error) {
      setErrorTaskId(taskId);
    } finally {
      setLoadingTaskId(null);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading tasks</div>;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 rounded-md bg-gray-200">
        {data?.data.map((task) => (
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
                <UpdateTask task={task} />
                <Button
                  className="w-full"
                  onClick={() => handleDelete(task._id)}
                  variant={"destructive"}
                  disabled={loadingTaskId === task._id}
                >
                  {loadingTaskId === task._id ? "Loading..." : "Delete"}
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
      <div className="flex justify-center mt-4">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={data?.totalPages || 1}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default TaskList;
