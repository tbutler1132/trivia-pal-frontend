import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Signup extends Component{
    state = {
        name: "",
        password: ""
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.submitHandler(this.state)
    }
    
    render(){

        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <input type="text" name="name" placeholder="Pame" value={this.state.name} onChange={this.changeHandler}/>
                    <input type="text" name="password" placeholder="Password" value={this.state.password} onChange={this.changeHandler}/>
                    <input type="submit" value="sign up" />
                </form>
                <button onClick={() => this.props.history.push('/login')}>Back to Login</button>
            </div>
        )
    }
}

export default withRouter(Signup)