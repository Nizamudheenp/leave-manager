import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProtectedRoute from "./components/ProtectedRoute"
import EmployeeDashboard from "./pages/EmployeeDashboard"
import AdminDashboard from "./pages/AdminDashboard"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import {Toaster} from 'sonner';

function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar />
    <Toaster richColors position="top-right" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route 
        path="employee-Dashboard"
        element={
          <ProtectedRoute role={["user"]}>
            <EmployeeDashboard />
          </ProtectedRoute>
        } />

        <Route 
        path="admin-Dashboard"
        element={
          <ProtectedRoute role={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
