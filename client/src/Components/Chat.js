import React from 'react'
import { Button, Form } from 'react-bootstrap'
import io from 'socket.io-client'


class Chat extends React.Component {

    constructor(props) {
        super()
        this.state = {
            user: props.user,
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
        let name = this.state.user.name
        this.socket.emit('new message', {
            author: name,
            message: this.state.message
        })
    }


    renderMessages = () => {
        return this.state.messages.map((message, index) => { 
            return <p key={index}><span className="author">{message.author}</span> say: <span className="message">{message.message}</span></p>
        })
    }

    render() {
        return (
        <div className="chat-room">
            <ul id="messages">
                {this.renderMessages()}
            </ul>
            <Form inline className="chat-form" onSubmit={this.submitMessage}>
                    <Form.Control
                        type="text"
                        id=""
                        autocomplete="off"
                        placeholder="Type your Message Here"
                        value={this.state.message}
                        onChange={(e) => this.setState({ message: e.target.value })}/>
                    <br/>
                    <Button id="" variant="dark" type="submit">Send</Button>
            </Form>
        </div>
        )
    }

}

export default Chat