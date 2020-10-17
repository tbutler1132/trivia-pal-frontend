import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Components/Login'
import Signup from './Components/Signup'
import { Route, Switch } from 'react-router-dom'

const BASE_API = 'localhost:3000'

class App extends Component {

  state = {
    user: null
  }

  signupHandler = (userObj) => {
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({user: userObj})
    })
  .then(r => r.json())
  .then(console.log)
  }

  loginHandler = (userInfo) => {
    console.log(userInfo)
    fetch("http://localhost:3000/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({user: userInfo})
    })
    .then(r => r.json())
    .then(console.log)
  }

  render(){

  
  return (
    <Switch>
      <Route path="/login" render={() => <Signup submitHandler={this.loginHandler}/>}/>
      <Route path="/signup" render={() => <Signup submitHandler={this.signupHandler}/>}/>
    </Switch>
  );

  }
}

export default App;
