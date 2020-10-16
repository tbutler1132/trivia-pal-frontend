import React, { Component } from 'react'

class Login extends Component{
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
            <form onSubmit={this.submitHandler}>
                <input type="text" name="name" placeholder="name" value={this.state.name} onChange={this.changeHandler}/>
                <input type="text" name="password" placeholder="password" value={this.state.password} onChange={this.changeHandler}/>
                <input type="submit" value="sign up" />
            </form>
        )
    }
}

export default Login