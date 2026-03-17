import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import { ProductDetail } from './pages/ProductDetail'
import SearchResults from './pages/SearchResult'

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
