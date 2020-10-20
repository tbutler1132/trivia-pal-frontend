import React, { Component } from 'react'

class Chat extends Component {
    
    state = {
        highestScore: {},
        questionsLength: this.props.questionsLength
    }

    componentDidMount = () => {
        fetch('http://localhost:3000/scores')
        .then(r => r.json())
        .then(data => {
            
            this.setState({highestScore: data[0]})
            console.log(this.state.highestScore)
        })
    }
    
    render(){
        console.log(this.state.questionsLength)
    return(
        <div id="container-3">
            <h1>Chat</h1>
            <div>
                
      
                    
                    <p>Granovetter begins by looking a draw in their other  strong relations and will eventually form a clique.egins by looking a draw in their other  strong relations and will eventually form a clique. The only way, therefore, that people in different  egins by looking a draw in their other  strong relations and will eventually form a clique. The only way, therefore, that people in different  egins by looking a draw in their other  strong relations and will eventually form a clique. The only way, therefore, that people in different  egins by looking a draw in their other egins by looking a draw in their other  strong relations and will eventually form a clique. The only way, therefore, that people in different egins by looking a draw in their other  strong relations and will eventually form a clique. The only way, therefore, that people in different egins by looking a draw in their other  strong relations and will eventually form a clique. The only way, therefore, that people in different egins by looking a draw in their other  strong relations and will eventually form a clique. The only way, therefore, that people in different  strong relations and will eventually form a clique. The only way, therefore, that people in different  The only way, therefore, that people in different cliques can be connected is through weak ties that do not have the strength to draw together all the “friends of friends.</p>
                    
  
            </div>
        </div>
    )
    }
}

export default Chat