import React from 'react'
import { Container, Button, Row, Col } from 'react-bootstrap'

class Answer extends React.Component {

    state = {
        variant: 'light'
    }

    submitAnswer = () => {
            switch (this.props.value) {
                case 0: {
                    this.setState({ variant: 'danger' });
                    setTimeout(() => { this.setState({ variant: 'light ' })}, 3900)
                    setTimeout(() =>  this.props.nextQuestion(this.props.value), 4000)
                    break;
                }
                case 1: {
                    this.setState({ variant: 'success' });
                    setTimeout(() => { this.setState({ variant: 'light '})}, 3900)
                    setTimeout(() => { this.props.nextQuestion(this.props.value) }, 4000)
                    break;
                }
                default:
                    console.log('Check the Answer Switch')
                    break;
            }
        }

    render() {
        return (
            <Container className="container-1">
                <div >
                <Row >
                    <Button size='lg' target="_blank" variant={this.state.variant}  id={this.state.htmlID} disabled={this.props.answered} onClick={this.submitAnswer} active>
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