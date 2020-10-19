import React from 'react'
import { Container, Button, Form } from 'react-bootstrap'

class Answer extends React.Component {

    state = {
        htmlID: '',
        clicked: false,
    }

    submitAnswer = () => {
        if (!this.state.clicked) {
            switch (this.props.value) {
                case 0:
                    this.setState({ htmlID: "clicked-wrong" })
                    break;
                case 1:
                    this.setState({ htmlID: "clicked-right" })
                    break;
                default:
                    console.log('Check the Answer Switch')
                    break;
            }
            this.props.nextQuestion(this.props.value)
        }
    }

    render() {
        return (
            <Button className="answer" id={this.state.htmlID} disabled={this.props.answered} onClick={() => this.submitAnswer() }>
                { this.props.answer.replace(/&quot;|&#039;/gi, "'").replace(/&amp;/gi, "&") }
            </Button >
        )
    }
}

export default Answer