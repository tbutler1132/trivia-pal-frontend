import React from 'react'
import { Container, Button, Row, Col } from 'react-bootstrap'

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
            <Container className="container-1">
                <div >
                <Row >
                    <button target="_blank" variant="white"  id={this.state.htmlID} disabled={this.props.answered} onClick={() => this.submitAnswer() }>
                        <span>
                            { this.props.answer.replace(/&quot;|&#039;/gi, "'").replace(/&amp;/gi, "&") }
                        </span>
                    </button >
                </Row>
                </div >
            </Container>
        )
    }
}

export default Answer