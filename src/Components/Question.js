import React from 'react'
import Answer from './Answer'

class Question extends React.Component {
    
    state = {
        answered: false,
    }

    componentDidUpdate() {
    }

    renderAnswers = () => {
        if (this.props.question) {
            let wrongAnswers = this.props.question.incorrect_answers.map((answer, index) => {
                return <Answer key={index} value={0} answer={answer} nextQuestion={this.props.nextQuestion}/>
            })
            let rightAnswer = <Answer key={this.props.question.correct_answer} value={1} answer={this.props.question.correct_answer} nextQuestion={this.props.nextQuestion}/>
            let answers = [...wrongAnswers, rightAnswer]
            return this.props.shuffle(answers)
        }
    }

    render() {
        return (
            <>
                {this.props.question ?
                    <div className="question">
                        <h1 className="question-title">Question: {this.props.question.question.replace(/&quot;|&#039;/gi, "'").replace(/&amp;/gi, "&")}</h1>
                        {this.renderAnswers()}
                    </div>
                    :
                    <h1>Please refresh your session by logging out then back in</h1>
                }
            </>
        )
    }
}

export default Question