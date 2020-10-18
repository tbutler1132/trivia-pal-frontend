import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'



class GameContainer extends React.Component {

    state = {
        user: this.props.user,
        numberOfQuestions: '5',
        category: 'Entertainment: Film',
        difficulty: 'easy',
    }


    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value})
    }

    createNewGame = (e) => {
        e.preventDefault();
        this.props.createGame(this.state.category, this.state.difficulty, this.state.numberOfQuestions)
    }

    render() {
        const token = localStorage.getItem("token")
        return (
        <>
                {token ?
                    <div>
                        <h1>Create a New Game!</h1>
                        <h2>Set your Game Settings</h2>
                        <form type="submit" onSubmit={this.createNewGame}>
                            Difficulty:
                                <select name="difficulty" value={this.state.diffculty} onChange={this.changeHandler}>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                            Category:
                                <select name="category" value={this.state.category} onChange={this.changeHandler}>
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
                            </select>
                            <button type="submit">Start Game!</button>
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