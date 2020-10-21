import React from "react"
import { withRouter } from 'react-router-dom'
import Question from './Question'
import Chat from './Chat'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Leaderboard from './Leaderboard'

const BASE_API = 'http://localhost:3000'

class Game extends React.Component {

    state = {
        allQuestions: [],
        filteredQuestions: '',
        category: this.props.category,
        numberOfQuestions: this.props.numberOfQuestions,
        difficulty: this.props.difficulty,
        submitted: false,
    }

    componentDidMount() {
        fetch(`${BASE_API}/questions`)
            .then(resp => resp.json())
            .then(data => this.setState({ allQuestions: data }))
            .then(() => this.setQuestions() )
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
            let newArray = this.state.filteredQuestions.shift()
            this.setState({ filteredArray: newArray})
            this.setState(prevState => ({ questionsLeft: prevState.questionsLeft - 1 }))
            this.props.updateScore(value)   
        }
    }

    updateQuestions = () => {

    }

    renderQuestion = () => {
        let singleQuestion = this.state.filteredQuestions.slice(0, 1);
        return <Question key={singleQuestion.id} question={singleQuestion[0]} nextQuestion={this.nextQuestion} />
    }

    resetState = () => {
        this.props.newGame()
        this.setState({
            filteredQuestions: [],
            category: this.props.category,
            numberOfQuestions: this.props.numberOfQuestions,
            difficulty: this.props.difficulty,
            submitted: false
        })
    }

    render() {
        // console.log(this.props.user.user.scores.map(el => el.points).reduce((a, b) => a + b, 0))
        return (
            <> 
                <div >
                    <Container fluid>
                        <Row className="header-container">
                            <Col><h3 className="header-container-text">Category - {this.capitalize(this.state.category)}</h3></Col>
                            <Col><h3 className="header-container-text">Difficulty - {this.capitalize(this.state.difficulty)}</h3></Col>
                            <Col><h3 className="header-container-text">Questions Left - {this.state.filteredQuestions.length}</h3></Col>
                            <Col>{ this.state.filteredQuestions.length === 0 ? <h3 className="header-container-text">Good Game!</h3> : <h3 className="header-container-text">Current Score:  {this.props.score} / {this.props.numberOfQuestions}</h3>}</Col>
         
                            {/* <Col><Chat /></Col> */}

                        </Row>
                        <div className="profile-container">
                            <Row id="profile-name">
                                <Col>{this.props.user ? <h3>Player: { this.props.user.name} </h3> : null }</Col>
                            </Row>
                        </div>
                        <div >
                            <Row >
                                <Col className="container-4" sm={7} id="game">{this.state.filteredQuestions.length !== 0 ? <>{this.renderQuestion()}</> :
                                    <>
                                        <br/>
                                        <h1>Thank you for playing!</h1>
                                        <h3> Final Score: {this.props.score} / {this.props.numberOfQuestions}</h3>
                                        <Leaderboard user={this.props.user} submitted={this.state.submitted} questions={this.state.numberOfQuestions} difficulty={this.state.difficulty} category={this.state.category} score={this.props.score} resetState={this.resetState}/> </>}
                                </Col>
                                <Col sm={3} className="chat-container"> <Chat user={this.props.user}/> </Col>
                            </Row>
                        </div>
                    </Container>
                </div>
            </>
        )
    }
}


export default withRouter(Game)