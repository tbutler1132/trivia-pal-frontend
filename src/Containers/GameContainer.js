import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'

class GameContainer extends React.Component {

    state = {
        user: this.props.user
    }

    componentDidMount() {
        console.log(this.props)
    }


    render() {
        return (
            <div>
                {this.props.user ? <h1>You're here!</h1> : <Redirect to="/signup"/>}
            </div>
            );
        }
}

export default withRouter(GameContainer)