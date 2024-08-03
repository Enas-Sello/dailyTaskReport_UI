// src/types.ts
export interface Task {
  _id: string
  description: string
  from: string | Date | null
  to: string | Date | null
  employee: string
}

export interface Employee {
  _id: string
  name: string
  tasks: Task[]
}
