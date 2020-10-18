import React from 'react'
import { Redirect, withRouter} from 'react-router-dom'

class GameContainer extends React.Component {

    state = {
        user: this.props.user,
        numberOfQuestions: '5',
        category: '',
        difficulty: '',
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: [e.target.value]})
    }

    createNewGame = (e) => {
        e.preventDefault();
        this.props.createGame(this.state.category, this.state.difficulty, this.state.numberOfQuestions)
    }

    render() {
        return (
        <>
                {this.props.user ?
                    <div>
                        <h1>You're here!</h1>
                        <h2>Set your Game Settings</h2>
                        <form type="submit" onSubmit={this.createNewGame}>
                            Difficulty:
                                <select name="difficulty" value={this.state.diffculty} onChange={this.changeHandler}>
                                <option value=""></option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Difficulty</option>
                            </select>
                            Category:
                                <select name="category" value={this.state.category} onChange={this.changeHandler}>
                                <option value=""></option>
                                <option value="Entertainment: Film">Film</option>
                                <option value="Geography">Geography</option>
                                <option value="Entertainment: Music">Music</option>
                                <option value="Science: Computers">Computer Science</option>
                                <option value="Sports">Sports</option>
                                <option value="History">History</option>
                                <option value="Mythology">Mythology</option>
                                <option value="Science & Nature">Science & Nature</option>
                                <option value="Politics">Politics</option>
                                <option value="Entertainment: Video Games">Video Games</option>
                            </select>
                            Number of Questions:
                                <select name="numberOfQuestions" value={this.state.numberOfQuestions} onChange={this.changeHandler}>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </select>
                            <button type="submit">Create New Game!</button>
                        </form >
                    </div>
                    :
                    <Redirect to="/login" />
                }
        </>
            )
    }
}

export default withRouter(GameContainer)