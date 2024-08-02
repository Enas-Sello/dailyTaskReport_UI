import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Task {
  id: string
  description: string
  startTime: string
  endTime: string
  employee: string
}

interface TasksState {
  tasks: Task[]
  totalHours: number
  remainingHours: number
}

const initialState: TasksState = {
  tasks: [],
  totalHours: 0,
  remainingHours: 8,
}

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload)
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload)
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      )
      if (index !== -1) {
        state.tasks[index] = action.payload
      }
    },

    setTotalHours: (state, action: PayloadAction<number>) => {
      state.totalHours = action.payload
      state.remainingHours = 8 - state.totalHours
    },
  },
})

export const { addTask, setTotalHours } = tasksSlice.actions
export default tasksSlice.reducer
