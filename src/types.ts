// src/types.ts
export interface Task {
  id: string
  description: string
  from: string
  to: string
  employee: string
}

export interface Employee {
  _id: string
  name: string
  tasks: Task[]
}
