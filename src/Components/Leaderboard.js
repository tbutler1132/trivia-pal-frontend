import React, { Component } from 'react'

class Leaderboard extends Component {

    state = {
        userTotalScore: []
    }


    // componentDidMount = () => {
    //     fetch('http://localhost:3000/scores')
    //     .then(r => r.json())
    //     .then(data => {
            
    //         console.log(data)
    //         const newArray = [...this.state.highScores]
    //         const newState = newArray.concat(data)
    //         this.setState({highScores: newState})
    //         console.log(this.state.highScores)
    //     }) 
    // }

    render (){

        return (
            <p>Hi</p>
        )

    }



}

export default Leaderboard