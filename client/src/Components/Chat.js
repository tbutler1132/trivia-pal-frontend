import React from 'react'
import { Button, Form, Container, Col } from 'react-bootstrap'
import io from 'socket.io-client'


class Chat extends React.Component {

    constructor(props) {
        super()
        this.state = {
            name: props.user,
            message: '',
            messages: [],
        }
        this.socket = io('localhost:3002')

        this.socket.on('receive message', (data) => {
            console.log(data)
            this.setState({messages: [...this.state.messages, data], message: ''})
        })
    }


    submitMessage = (e) => {
        e.preventDefault()
        console.log(this.props.user)
        let name = this.props.user.name
        this.socket.emit('new message', {
            author: name,
            message: this.state.message
        })
    }


    renderMessages = () => {
        return this.state.messages.map((message, index) => { 
            return <p key={index}><span className="author">{message.author}</span>: <span className="message">{message.message}</span></p>
        })
    }

    render() {
        return (
            <>
            <h3>Chat Room</h3>
            <ul id="messages">
                {this.renderMessages()}
            </ul>
            <Container fluid>
                <Form inline onSubmit={this.submitMessage}>
                    <Form.Row>
                        <Col>
                            <Form.Control
                                size="lg"
                                type="text"
                                autoComplete="off"
                                placeholder="Send a message"
                                value={this.state.message}
                                onChange={(e) => this.setState({ message: e.target.value })}>
                            </Form.Control>
                        </Col>
                        <Col>
                            <Button size='lg' className="send-message" variant="dark" type="submit">Send</Button>
                        </Col>
                    </Form.Row>
                </Form>
            </Container>
            </>
        )
    }

}

export default Chat