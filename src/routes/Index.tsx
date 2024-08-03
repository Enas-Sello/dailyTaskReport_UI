import SignUp from "@/pages/SignUp"
import Login from "@/pages/Login"
import { Route, Routes } from "react-router-dom"

const Root = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
    </Routes>
  )
}

export default Root
