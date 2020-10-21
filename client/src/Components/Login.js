import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

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

            <div className="login-form">
                <h1>Welcome to Triva!</h1>
                <Form onSubmit={this.submitHandler}>
                    <Form.Group>
                    <Form.Control type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.changeHandler}/>
                        <Form.Control type='password' name="password" placeholder="Password" value={this.state.password} onChange={this.changeHandler} />
                    </Form.Group>
                    <Form.Group>
                        <Button variant="dark" id="login-submit" type="submit" value="Login">Login</Button>
                    </Form.Group>
                </Form>
                <Button variant="dark" id="new-user" onClick={() => this.props.history.push('/signup')}>New User? Register Here</Button>
            </div>
        )
    }
}

export default withRouter(Login)