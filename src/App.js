import React from 'react'
import Nav from "./features/nav/Nav"
import Home from "./features/home/Home"
import Settle from "./features/settle/Settle"
import SettleSucceed from './features/settle/SettleSucceed'
import './App.css'
import { Redirect, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div className="container-fluid">
      <Nav></Nav>

      <Switch>
        <Route exact path="/home">
          <Home></Home>
        </Route>
        <Route exact path="/settle">
          <Settle></Settle>
        </Route>
        <Route exact path="/settle/succeed">
          <SettleSucceed></SettleSucceed>
        </Route>
        <Redirect to="/settle/succeed"></Redirect>
      </Switch>
    </div>
  )
}

export default App
