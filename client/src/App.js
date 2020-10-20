import React, { Component } from 'react';
import './App.scss';
import Login from './Components/Login'
import Signup from './Components/Signup'
import Game from './Components/Game'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import GameContainer from './Containers/GameContainer'
import { Button } from 'react-bootstrap'
import Chat from './Components/Chat'

const BASE_API = 'http://localhost:3000'

class App extends Component {

  state = {
    user: null,
    category: '',
    difficulty: '',
    numberOfQuestions: '',
    score: 0,
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
      this.props.history.push('/login')
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
    this.props.history.push('/')
  }

  createGame = (newCategory, newDifficulty, newNumberOfQuestions) => {
    this.setState({ category: newCategory, difficulty: newDifficulty, numberOfQuestions: newNumberOfQuestions })
    this.props.history.push('/lobby')
  }

  startGame = () => {
    this.props.history.push('/game')
  }

  updateScore = (value) => {
    if (value === 1) {
      this.setState((prevState) => ({ score: prevState.score + 1}))
    }
  }

  newGame = () => {
    this.setState({ category: '', difficulty: '', numberOfQuestions: '', score: 0 })
    this.props.history.push('/lobby')
  }

  render() {
    return (
        <div className="app-div" >
        <Switch>
          <Route exact path="/"><Redirect to="login"/></Route>
          <Route path="/login" render={() => <Login submitHandler={this.loginHandler} />} />
          <Route path="/signup" render={() => <Signup submitHandler={this.signupHandler} />} />
          <Route path="/lobby" render={() => <GameContainer user={this.state.user} createGame={this.createGame} />} />
          <Route path="/game" render={() => <Game user={this.state.user} category={this.state.category} difficulty={this.state.difficulty} numberOfQuestions={this.state.numberOfQuestions} updateScore={this.updateScore} score={this.state.score} newGame={this.newGame} />} />
        </Switch>
        <br />

        {this.state.user ?
          <>
            <div>
              <Chat user={this.state.user}/>
            </div>
          <Button className="logout-button" variant="danger" onClick={this.logOutHandler}>Logout</Button>
          </>
          :
            null
          }
        </div>
      );
    }
  }

export default withRouter(App);
