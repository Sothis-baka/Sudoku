import React from "react";

import './App.css';
import Main from "./pages/Main";
import Game from "./pages/Game";

class App extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      gaming: false,
      difficulty: ""
    }
  }

  // start or end game
  changeGameStatus = () => {
    this.setState({ gaming: !this.state.gaming });
  }

  // set difficulty for game
  setDifficulty = (num) => {
    this.setState({ difficulty: num });
  }

  render() {
    return (
        <div className="App">
          {
            this.state.gaming
                ? <Game difficulty={ this.state.difficulty } changeGameStatus={ this.changeGameStatus }/>
                : <Main difficulty={ this.state.difficulty } changeGameStatus={ this.changeGameStatus } setDifficulty={ this.setDifficulty }/>
          }
        </div>
    );
  }
}

export default App;
