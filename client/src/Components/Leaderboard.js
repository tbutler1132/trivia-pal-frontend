import React, { Component } from 'react'
import { Table, Button, Container, Row, Col } from 'react-bootstrap'

const BASE_API = 'http://localhost:3000'

class Leaderboard extends Component {

    state = {
        allScores: [],
        filteredScores: [],
        submitted: this.props.submitted
    }


    componentDidMount = () => {
        console.log(this.props)
        fetch('http://localhost:3000/scores')
        .then(r => r.json())
            .then(data => { this.setState({ allScores: data }) })
            .then(() => this.filterScores())
            .then(() => this.sortScores())
    }
    
    filterScores = () => {
        let newArray = this.state.allScores.filter(score => {
            return score.user.id === this.props.user.id
        })

        this.setState({ filteredScores: newArray })
    }

    capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    sortScores = () => {
        let newArray = this.state.filteredScores.sort((a, b) => { return a.points - b.points })
        this.setState({ filteredScores: newArray })
    }

    renderScores = () => {
        return this.state.filteredScores.map((score, index) => 
            <tr key={index}><td> {score.points} / {score.questions}</td><td> {this.capitalize(score.category)} </td><td> {this.capitalize(score.difficulty)}</td></tr>
        )
    }

    submitScore = () => {
        const questions = parseInt(this.props.questions)
        fetch(BASE_API + "/scores", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify({
                points: this.props.score,
                difficulty: this.props.difficulty,
                category: this.props.category,
                questions: questions,
                user_id: this.props.user.id
            })
        })
            .then(resp => resp.json())
            .then(resp => console.log(resp))
            .then(resp => this.setState(prevState => ({ submitted: !prevState.submitted })))
            .then(() => { this.componentDidMount() })
    }

    render (){

        return (
            <>
                <h4>Past Games</h4>
                <Table className="leaderboard" variant='dark' responsive striped >
                    <thead>
                        <tr>
                            <th><u>Score</u></th>
                            <th><u>Category</u></th>
                            <th><u>Difficulty</u></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderScores()}
                    </tbody>
                </Table>
                <Container className="leaderboard-buttons">
                    <Row >
                    <Col ><Button id="submit-score" variant="dark" disabled={this.state.submitted} onClick={() => this.submitScore()}>Submit Score!</Button></Col>
                        <Col ><Button id="new-game-button" variant="dark" onClick={() => this.props.resetState()}> New Game</Button></Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default Leaderboard