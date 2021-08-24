import React from "react";

class Main extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            showing: 0
        }
    }

    // switch the display of selection and instruction.
    changeShowing = (num) => {
        this.setState({ showing: num });
    }

    setDifficulty = (mode) => {
        this.props.setDifficulty(mode);
        this.changeShowing(0);
    }

    render() {
        const showing = this.state.showing;
        const difficulty = this.props.difficulty;

        return (
            <div id='mainPage'>
                <div id='mainContent' className={ showing===2 ? "blur" : "" }>
                    <h1>Sudoku</h1>
                    <button id='startBtn' onClick={ ()=>this.props.changeGameStatus() }>S t a r t</button>
                    <ul>
                        <li className='cornerBtn' onClick={ ()=>this.changeShowing(showing === 1 ? 0 : 1) }>
                            { difficulty || 'Difficulty' }
                            {
                                showing === 1
                                    ? <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="arrow on" viewBox="0 0 16 16">
                                        <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                                    </svg>
                                    : <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="arrow" viewBox="0 0 16 16">
                                        <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                                    </svg>
                            }
                        </li>
                        {
                            showing === 1 &&
                            <ul id='modeGroup'>
                                <li onClick={ () => this.setDifficulty('Easy') }>Easy</li>
                                <li onClick={ () => this.setDifficulty('Medium') }>Medium</li>
                                <li onClick={ () => this.setDifficulty('Hard') }>Hard</li>
                                <li onClick={ () => this.setDifficulty('Expert') }>Expert</li>
                            </ul>
                        }
                        <li className='cornerBtn' onClick={ ()=>this.changeShowing(2) }>How to Play</li>
                    </ul>
                    <a href='https://github.com/Sothis-baka/sudoku' target='_blank' rel='noreferrer'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi" viewBox="0 0 16 16">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                        </svg>
                    </a>
                </div>

                {/* display popup window based on current selection */}

                {
                    showing === 2 &&
                    (
                        <div id='instructionGroup' onClick={ ()=>this.changeShowing(0) }>
                            <p>Select number from 1-9 to fill each cell. None of the rows, columns, or squares should contain repeat numbers.</p>
                            <br/>
                            <small>Click to continue</small>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default Main;