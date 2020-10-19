import React from "react"
import { withRouter } from 'react-router-dom'
import Question from './Question'

const BASE_API = 'http://localhost:3000'

class Game extends React.Component {

    state = {
        allQuestions: [],
        filteredQuestions: [],
        category: this.props.category,
        numberOfQuestions: this.props.numberOfQuestions,
        difficulty: this.props.difficulty,
        submitted: false,
        answered: false
    }

    componentDidMount() {
        fetch(`${BASE_API}/questions`)
            .then(resp => resp.json())
            .then(data => this.setState({ allQuestions: data }))
            .then(() => this.setQuestions() )
    }
    componentDidUpdate() {
    }
    capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
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

    setQuestions = () => {
        let filteredArray = this.state.allQuestions.filter(question => {
            if ((question.category === this.state.category) && (question.difficulty === this.state.difficulty)) {
                return question
            }
        })
        let shuffledArray = this.shuffle(filteredArray)
        let slicedArray = shuffledArray.slice(0, this.state.numberOfQuestions)
        this.setState({ filteredQuestions: slicedArray })
    }

    nextQuestion = (value) => {
        if (this.state.filteredQuestions !== 0) {
            this.props.updateScore(value)
            this.setState({ answered: true })
            setTimeout(this.updateQuestions, 3000)
        }
    }

    updateQuestions = () => {
        let newArray = this.state.filteredQuestions.shift()
        this.setState({ filteredArray: newArray, answered: false })
        this.setState(prevState => ({ questionsLeft: prevState.questionsLeft - 1 }))
    }

    renderQuestion = () => {
        let singleQuestion = this.state.filteredQuestions.slice(0, 1);
        return <Question key={singleQuestion.id} question={singleQuestion[0]} nextQuestion={this.nextQuestion} answered={this.state.answered}/>
    }

    submitScore = () => {
        fetch(BASE_API + "/scores", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify({
                points: this.props.score,
                user_id: this.props.user.id
            })
        })
        .then(resp => resp.json())
        .then(resp => console.log(resp))
        .then(resp => this.setState({ submitted: true }))
    }

    resetState = () => {
        this.setState({
            filteredQuestions: [],
            category: this.props.category,
            numberOfQuestions: this.props.numberOfQuestions,
            difficulty: this.props.difficulty,
            submitted: false,
            answered: false,
        });
        setTimeout(this.props.newGame(), 500)
    }

    render() {
        return (
            <> 
                <div>
                    <span><h1>Category: {this.capitalize(this.state.category)}</h1>
                        <h1>Difficulty: {this.capitalize(this.state.difficulty)}</h1>
                        <h1>Questions Left: {this.state.filteredQuestions.length}</h1>
                        <h1>Current Score: {this.props.score} / {this.props.numberOfQuestions}</h1></span>
                    {this.state.filteredQuestions.length === 0 ? <><h1>Thank you for playing!</h1> <button disabled={this.state.submitted} onClick={() => this.submitScore()}>Submit Score!</button> <button onClick={() => this.resetState() } >New Game</button> </> : <>{this.renderQuestion()}</>}
                </div>
            </>
        )
    }
}


export default withRouter(Game)