import React, { useState } from "react"
import Login from "./pages/Login"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormDataProps } from "./Utils/types";

const App: React.FC = () => {

  const [showLoginForm, setShowLoginForm] = useState(false)
  const [errors, setErrors] = useState<FormDataProps>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
})

  const handleToggleLogin = () => {
    setShowLoginForm((prev) => !prev);
    setErrors({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''})
};
  
  return (
   <>
    <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar 
        closeOnClick 
        pauseOnHover={false} 
        draggable/>
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
          <Login 
            showLoginForm={showLoginForm}
            handleToggleLogin={handleToggleLogin}
            setShowLoginForm={setShowLoginForm}
            errors={errors}
            setErrors={setErrors}/>} />
        <Route 
          path="/dashboard" 
          element={
          <Dashboard 
            handleToggleLogin={handleToggleLogin}
            setShowLoginForm={setShowLoginForm}/>} />
      </Routes>
    </Router>
   </> 
  )
}

export default App
