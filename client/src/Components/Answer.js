import React from 'react'
import { Container, Button, Row, Col } from 'react-bootstrap'

class Answer extends React.Component {

    state = {
        variant: this.props.variant,
        clicked: false,
    }



    submitAnswer = () => {
        if (!this.state.clicked) {
            switch (this.props.value) {
                case 0: {
                    this.setState({ variant: 'danger' })
                    setTimeout(() => { this.props.nextQuestion(this.props.value) }, 4000)
                    break;
                }
                case 1: {
                    this.setState({ variant: 'success' })
                    setTimeout(() => { this.props.nextQuestion(this.props.value) }, 4000)
                    break;
                }
                default:
                    console.log('Check the Answer Switch')
                    break;
            }
        }
    }

    render() {
        return (
            <Container className="container-1">
                <div >
                <Row >
                    <Button size='lg' target="_blank" variant={this.state.variant}  id={this.state.htmlID} disabled={this.props.answered} onClick={() => this.submitAnswer() }>
                        <span>
                            { this.props.answer.replace(/&quot;|&#039;/gi, "'").replace(/&amp;/gi, "&") }
                        </span>
                    </Button >
                </Row>
                </div >
            </Container>
        )
    }
}

export default Answer