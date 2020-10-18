import React from 'react'

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
            }
            this.props.nextQuestion(this.props.value)
        }
    }

    render() {
        return (
            <button className="answer" id={this.state.htmlID} onClick={() => this.submitAnswer() }>
                { this.props.answer.replace(/&quot;|&#039;/gi, "'").replace(/&amp;/gi, "&") }
            </button >
        )
    }
}

export default Answer