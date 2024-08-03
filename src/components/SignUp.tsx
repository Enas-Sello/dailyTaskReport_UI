import React, { useState } from "react"
import { useCreateEmployeeMutation } from "@/store/api"
import { useDispatch } from "react-redux"
import { setEmployee } from "../store/employeeSlice"
import Dashboard from "@/components/Dashboard"
import { Link } from "react-router-dom"

const SignUp: React.FC = () => {
  const [name, setName] = useState("")
  const [createEmployee] = useCreateEmployeeMutation()
  const [employee, setEmployeeState] = useState<any>(null)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const handleSubmit = async () => {
    setIsLoading(true)
    setIsError(false)
    try {
      // Try to create a new employee with the given name
      const newEmployee = await createEmployee({ name }).unwrap()
      setEmployeeState(newEmployee)
      dispatch(setEmployee(newEmployee))
    } catch (error) {
      setIsError(true)
      console.error("Failed to create employee:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {!employee ? (
        <>
          <h2 className="mb-4 text-xl font-bold">
            Start adding your daily tasks
          </h2>
          <input
            className="p-2 mb-4 border-2 rounded"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            Sign Up
          </button>
          <p className="mt-4 text-gray-700">
            Already have an account?{" "}
            <Link to="/" className="text-blue-500 hover:underline">
              Login
            </Link>{" "}
            by just adding your name.
          </p>
          {isLoading && <p className="mt-4 text-blue-500">Loading...</p>}
          {isError && <p className="mt-4 text-red-500">Error signing up</p>}
        </>
      ) : (
        <Dashboard employee={employee} />
      )}
    </div>
  )
}

export default SignUp
