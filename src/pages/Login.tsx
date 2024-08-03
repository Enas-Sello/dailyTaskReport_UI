import React, { useEffect, useState } from "react"
import { useGetEmployeeQuery } from "@/store/api"
import { useDispatch } from "react-redux"
import { setEmployee } from "../store/employeeSlice"
import Dashboard from "@/components/Dashboard"
import { Link } from "react-router-dom"
import { Formik, Field, Form, ErrorMessage } from "formik"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { loginValidationSchema } from "@/validation/validationSchema"

const Login: React.FC = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState<string>("")
  const [shouldFetch, setShouldFetch] = useState(false)

  const {
    data: employee,
    isError,
    isLoading,
    refetch,
  } = useGetEmployeeQuery(name, { skip: !shouldFetch })

  useEffect(() => {
    if (employee) {
      dispatch(setEmployee(employee))
    }
  }, [employee, dispatch])

  return (
    <>
      {!employee ? (
        <div className="flex flex-col gap-4 justify-center items-center">
          <Card className="w-[400px] flex flex-col gap-4">
            <CardHeader>
              <CardTitle>Start adding your daily tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <Formik
                initialValues={{ name: "" }}
                validationSchema={loginValidationSchema}
                onSubmit={(values) => {
                  setName(values.name) 
                  setShouldFetch(true) 
                  refetch() 
                }}
              >
                <Form>
                  <Field
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    as={Input}
                    className="w-full mb-4"
                  />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="text-red-500 mb-5"
                  />
                  <Button type="submit" className="w-full" size="lg">
                    {isLoading ? (
                      <p className="mt-4 text-blue-500">Loading...</p>
                    ) : (
                      "Login"
                    )}
                  </Button>
                  {isError && (
                    <p className="mt-3 text-red-500 text-center text-lg">
                      Error logging in
                    </p>
                  )}
                </Form>
              </Formik>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="mt-4 text-gray-700">
                New here?{" "}
                <Link to="/signUp" className="text-blue-500 hover:underline">
                  Sign up
                </Link>{" "}
                by just adding your name.
              </p>
            </CardFooter>
          </Card>
        </div>
      ) : (
          employee&&
        <Dashboard employee={employee} />
      )}
    </>
  )
}

export default Login
