import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

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
            <div className="login-form">
                <h2>Create a new account here!</h2>
                <Form onSubmit={this.submitHandler}>
                    <Form.Group/>
                        <Form.Control type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.changeHandler}/>
                        <Form.Control type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.changeHandler}/>
                    <Form.Group/>
                    <Form.Group/>
                        <Button variant="dark" type="submit" value="sign up">Sign up!</Button>
                    <Form.Group/>
                </Form>
                <Button variant="dark" onClick={() => this.props.history.push('/login')}>Back to Login </Button>
            </div>
        )
    }
}

export default withRouter(Signup)