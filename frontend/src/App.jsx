import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import './App.css'

function App() {

  return (
    <>
      <Outlet />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </>
  )
}

export default App
