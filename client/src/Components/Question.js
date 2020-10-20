import React from 'react'
import Answer from './Answer'

class Question extends React.Component {
    
    state = {
    }

    shuffle = (a) =>  {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    renderAnswers = () => {
        if (this.props.question) {
            let wrongAnswers = this.props.question.incorrect_answers.map((answer, index) => {
                return <Answer key={index} value={0} answer={answer} nextQuestion={this.props.nextQuestion} answered={this.props.answered}/>
            })
            let rightAnswer = <Answer key={this.props.question.correct_answer} value={1} answer={this.props.question.correct_answer} nextQuestion={this.props.nextQuestion} answered={this.props.answered} questionAnswered={this.answeredQuestion}/>
            let answers = [...wrongAnswers, rightAnswer]
            return this.shuffle(answers)
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
                    <>
                        {this.props.history.push('/lobby')}
                    </>
                }
            </>
        )
    }
}

export default Question