import SignUp from "@/components/SignUp"
import Login from "@/pages/Login"
import Tasks from "@/pages/Tasks"
import { Route, Routes } from "react-router-dom"

const Root = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/signUp" element={<SignUp />} />
    </Routes>
  )
}

export default Root
