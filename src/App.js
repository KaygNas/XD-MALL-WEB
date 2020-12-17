import React from 'react'
import Nav from "./features/nav/Nav"
import Home from "./features/home/Home"
import './App.css'

function App() {
  return (
    <div className="container-fluid">
      <Nav></Nav>
      <Home></Home>
    </div>
  )
}

export default App
