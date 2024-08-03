import { Employee, Task } from "@/types"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    createTask: builder.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: "/tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),

    createEmployee: builder.mutation<Employee, Partial<Employee>>({
      query: (body) => ({
        url: "/employees",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tasks"],
    }),

    getEmployee: builder.query<Employee, string>({
      query: (name) => `/employees?name=${name}`,
      providesTags: ["Tasks"],
    }),

    getTasksByEmployee: builder.query<Task[], string>({
      query: (employeeId) => `/employees/${employeeId}/tasks`,
      providesTags: ["Tasks"],
    }),

    getTask: builder.query<Task, string>({
      query: (id) => `/tasks/${id}`,
      providesTags: ["Tasks"],
    }),

    updateTask: builder.mutation<Task, { id: string; data: Partial<Task> }>({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Tasks"],
    }),

    deleteTask: builder.mutation<void, { id: string; employeeID: string }>({
      query: ({ id, employeeID }) => ({
        url: `/tasks/${id}?employeeID=${employeeID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),

    getDailySummary: builder.query<
      { totalHours: number; remainingHours: number },
      { employeeId: string; date: string }
    >({
      query: ({ employeeId, date }) =>
        `/tasks/daily-summary/${employeeId}/${date}`,
      providesTags: ["Tasks"],
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
