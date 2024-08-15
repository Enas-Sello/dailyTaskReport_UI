import React from "react"
import { useCreateEmployeeMutation } from "@/store/api"
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
import { signUpValidationSchema } from "@/validation/validationSchema"
import { Employee } from "@/types"

const SignUp: React.FC = () => {
  const [createEmployee, { isLoading, isError }] = useCreateEmployeeMutation()
  const [employee, setEmployeeState] = React.useState<Employee | null>(null)
  const dispatch = useDispatch()

  const handleSubmit = async (values: { name: string }) => {
    try {
      const newEmployee = await createEmployee({ name: values.name }).unwrap()
      setEmployeeState(newEmployee)
      dispatch(setEmployee(newEmployee))
    } catch (error) {
      console.error("Failed to create employee:", error)
    }
  }

  return (
    <>
      {!employee ? (
        <div className="flex flex-col gap-4 justify-center items-center">
          <Card className="w-[350px] flex flex-col gap-4">
            <CardHeader>
              <CardTitle>Start adding your daily tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <Formik
                initialValues={{ name: "" }}
                validationSchema={signUpValidationSchema}
                onSubmit={handleSubmit}
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
                    className="text-red-500 mb-3"
                  />

                  <Button type="submit" className="w-full" size="lg">
                    {isLoading ? (
                      <p className="mt-4 text-blue-500">Loading...</p>
                    ) : (
                      " Sign Up"
                    )}
                  </Button>
                  {isError && (
                    <p className="mt-3 text-red-500 text-center text-lg">Error signing up</p>
                  )}
                </Form>
              </Formik>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="mt-4 text-gray-700">
                Already have an account?{" "}
                <Link to="/" className="text-blue-500 hover:underline">
                  Login
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <Dashboard />
      )}
    </>
  )
}

export default SignUp
