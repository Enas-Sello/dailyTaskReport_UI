import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Employee } from "@/types"

interface EmployeeState {
  employee: Employee | null
}

const initialState: EmployeeState = {
  employee: null,
}

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployee(state, action: PayloadAction<Employee>) {
      state.employee = action.payload
    },
    clearEmployee(state) {
      state.employee = null
    },
  },
})

export const { setEmployee, clearEmployee } = employeeSlice.actions
export default employeeSlice.reducer
