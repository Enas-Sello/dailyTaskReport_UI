import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface Task {
  id: string
  description: string
  from: string
  to: string
  employee: string
}

export interface Employee {
  id: string
  name: string
  tasks: Task[]
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  endpoints: (builder) => ({
    createTask: builder.mutation<Task, Partial<Task>>({
      query: (body) => ({
        url: "/tasks",
        method: "POST",
        body,
      }),
    }),

    createEmployee: builder.mutation<Employee, "">({
      query: (body) => ({
        url: "/employees",
        method: "POST",
        body,
      }),
    }),

    getEmployee: builder.query<Employee, string>({
      query: (id) => `/employees/${id}`,
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
      query: ({ employeeId, date }) => `/daily-summary//${employeeId}/${date}`,
    }),
  }),
})

export const {
  useCreateEmployeeMutation,
  useGetEmployeeQuery,
  useCreateTaskMutation,
  useGetTaskQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetDailySummaryQuery,
} = api
