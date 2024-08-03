import React, { useState, useEffect } from "react"
import { useGetEmployeeQuery } from "@/store/api"
import { useDispatch } from "react-redux"
import { setEmployee } from "../store/employeeSlice"
import Dashboard from "@/components/Dashboard"
import { Link } from "react-router-dom"

const Login: React.FC = () => {
  const [name, setName] = useState("")
  const [shouldFetch, setShouldFetch] = useState(false)
  const {
    data: employee,
    isError,
    isLoading,
  } = useGetEmployeeQuery(name, { skip: !shouldFetch })
  const dispatch = useDispatch()

  const handleSubmit = () => {
    setShouldFetch(true)
  }

  useEffect(() => {
    if (employee) {
      dispatch(setEmployee(employee))
    }
  }, [employee, dispatch])

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
            Login
          </button>
          <p className="mt-4 text-gray-700">
            New here?{" "}
            <Link to="/signUp" className="text-blue-500 hover:underline">
              Sign up
            </Link>{" "}
            by just adding your name.
          </p>
          {isLoading && <p className="mt-4 text-blue-500">Loading...</p>}
          {isError && <p className="mt-4 text-red-500">Error logging in</p>}
        </>
      ) : (
        <Dashboard employee={employee} />
      )}
    </div>
  )
}

export default Login
