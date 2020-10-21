import React, { Component } from 'react'
import { Table } from 'react-bootstrap'

class Leaderboard extends Component {

    state = {
        allScores: [],
        filteredScores: []
    }


    componentDidMount = () => {
        fetch('http://localhost:3000/scores')
        .then(r => r.json())
            .then(data => { this.setState({ allScores: data }) })
            .then(() => this.filterScores())
            .then(() => this.sortScores())
    }
    
    filterScores = () => {
        let newArray = this.state.allScores.filter(score => {
            return score.user_id === this.props.user.id
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
        return this.state.filteredScores.map((score) => {
            return <tr> <td> {score.points} / {score.questions} </td> <td> {this.capitalize(score.category)} </td> <td> {this.capitalize(score.difficulty)} </td> </tr>
        })
    }

    render (){

        return (
            <>
                <Table>
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
            </>
        )
    }



}

export default Leaderboard