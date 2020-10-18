import React from "react"
import { withRouter } from 'react-router-dom'

const BASE_API = 'http://localhost:3000'

class Game extends React.Component {

    state = {
        allQuestions: [],
        filteredQuestions: [],
        category: this.props.category,
        numberOfQuestions: this.props.numberOfQuestions,
        difficulty: this.props.difficulty
    }

    componentDidMount() {
        fetch(BASE_API + "/questions")
            .then( resp => resp.json())
            .then( bigdata  => this.setState({ allQuestions: bigdata }))
    }
            // .then(data => this.setState({ allQuestions: data }))
    //         .then( () => {
    //             if (this.state.allQuestions.length !== 0) {
    //                 let filteredArray = this.state.allQuestions.filter(question => {
    //                     return ((question.category === this.state.category) && (question.difficulty === this.state.difficulty))
    //                 })
    //             this.setState({ filteredQuestions: filteredArray })
    //             } else {
    //                 this.state.filteredQuestions = []
    //             }
    //         })
    // }

    



    render() {
        return (
            <div>
                <h1>{this.state.category}</h1>
                <h1>{this.state.difficulty}</h1>
                <h1>{this.state.numberOfQuestions}</h1>
                <p>{this.filterQuestions}</p>
            </div>
        )
    }

}


export default withRouter(Game)