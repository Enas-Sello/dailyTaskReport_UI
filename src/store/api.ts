import { Employee, Task } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  endpoints: (builder) => ({
    createTask: builder.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: "/tasks",
        method: "POST",
        body: task,
      }),
    }),

    createEmployee: builder.mutation<Employee, Partial<Employee>>({
      query: (body) => ({
        url: "/employees",
        method: "POST",
        body,
      }),
    }),

    getEmployee: builder.query<Employee, string>({
      query: (name) => `/employees?name=${name}`,
    }),

    getTasksByEmployee: builder.query<Task[], string>({
      query: (employeeId) => `/employees/${employeeId}/tasks`,
    }),

    getTask: builder.query<Task, string>({
      query: (id) => `/tasks/${id}`,
    }),

    updateTask: builder.mutation<Task, { id: string; data: Partial<Task> }>({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
    }),

    getDailySummary: builder.query<
      { totalHours: number; remainingHours: number },
      { employeeId: string; date: string }
    >({
      query: ({ employeeId, date }) => `/daily-summary/${employeeId}/${date}`,
    }),
  }),
})

export const {
  useCreateEmployeeMutation,
  useGetEmployeeQuery,
  useGetTasksByEmployeeQuery,
  useCreateTaskMutation,
  useGetTaskQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetDailySummaryQuery,
} = api