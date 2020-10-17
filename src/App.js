import React, { Component } from 'react';
import './App.css';
import Login from './Components/Login'
import Signup from './Components/Signup'
import { Route, Router, Switch, withRouter } from 'react-router-dom'
import GameContainer from './Containers/GameContainer'


const BASE_API = 'http://localhost:3000'


class App extends Component {

  state = {
    user: null
  }

  componentDidMount() {
    const token = localStorage.getItem("token")

    if (token) {
      fetch(`${BASE_API}/profile`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(r => r.json())
        .then(data => {
        this.setState({ user: data.user });
      })
      .catch(error => console.log(error))
    } else {
      // this.props.history.push('/signup')
    }
  }

  signupHandler = (userObj) => {
    fetch(`${BASE_API}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({user: userObj})
    })
    .then(r => r.json())
    .then(data => {
      this.setState({ user: data })
      localStorage.setItem("token", data.jwt)
      this.props.history.push('/lobby')
    })
    .catch(error => console.log(error))
  }

  loginHandler = (userInfo) => {
    fetch(`${BASE_API}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({user: userInfo})
    })
    .then(r => r.json())
    .then(data => {
      this.setState({ user: data})
      localStorage.setItem("token", data.jwt)
      this.props.history.push('/lobby')
    })
    .catch(error => console.log(error))
  }

  logOutHandler = () => {
    localStorage.removeItem('token')
    this.setState({ user: null })
    this.props.history.push('/signup')
  }



  render() {
    return (
        <div>
        <Switch>
          <Route path="/login" render={() => <Login submitHandler={this.loginHandler} />} />
          <Route path="/lobby" render={() => <GameContainer user={this.state.user}/> } />
          <Route path="/signup" render={() => <Signup submitHandler={this.signupHandler} />} />
        </Switch>
        {this.state.user ? <button onClick={this.logOutHandler}>Logout</button> : null}
        </div>
      );
    }
  }


export default withRouter(App);
