import React from "react";
import { printMatrix, isValid, initGame, CANDIDATES } from '../util/sudoku';

class Game extends React.Component{
    constructor(props) {
        super(props);

        const { cur_matrix,final_matrix } = initGame(this.props.difficulty);

        this.state = {
            cur_matrix,
            final_matrix,
            selected: -1,
            error: false,
            filled: [],
            time: [0, 0, 0]
        };
    }

    componentDidMount() {
        this.tick = setInterval(() => {
            const time = this.state.time;

            time[2]++;
            if(time[2] === 60){
                time[1]++;
                time[2]-=60;
                if(time[1] === 60){
                    time[0]++;
                    time[1]-=60;
                }
            }

            this.setState({ time });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.tick);
    }

    selectCell = (e) => {
        this.setState({ selected: e.target.value, error: false })
    }

    assignNum = (e) => {
        const cur_matrix = this.state.cur_matrix.slice(0);
        const filled = this.state.filled.slice(0);
        let { error, selected } = this.state;

        if(selected < 0){
            return;
        }

        const num = Number(e.target.value);

        if(num === 0){
            if(filled.includes(selected)){
                cur_matrix[selected] = num;
                filled.splice(filled.indexOf(selected), 1);
            }
        }else {
            if(isValid(cur_matrix, selected, num)){
                cur_matrix[selected] = num;
                filled.push(selected);
                selected = -1;
            }else{
                error = true;
            }
        }

        this.setState({ cur_matrix, filled, selected, error});
    }

    printTime = () => {
        const [hour, min, sec] = this.state.time
        return (hour<10?"0":"")+hour+":"+(min<10?"0":"")+min+":"+(sec<10?"0":"")+sec;
    }

    render() {
        const { cur_matrix, selected, error, filled } = this.state;
        let index = -1;

        return(
            <div id='gamePage'>
                <h1>Sudoku</h1>

                <ul id='gameBoard'>
                    {
                        cur_matrix.map(num => {
                            index++;

                            if(index === Number(selected)){
                                return <li className={"selected" + (error ? " error" : "")} id={ "cell" + index } value={ index }>{ num || "?" }</li>
                            }
                            if(filled.includes(index)){
                                return <li className="filled" id={ "cell" + index } value={ index } onClick={ this.selectCell }>{ num }</li>
                            }
                            if(num === 0){
                                return <li className="unassigned" id={ "cell" + index } value={ index } onClick={ this.selectCell }>?</li>;
                            }

                            return <li className="provided" id={ "cell" + index } value={ index }>{ num }</li>
                        })
                    }
                </ul>

                <ul id='choices'>
                    {
                        CANDIDATES.map(num => <li className='numChoice' id={ "choice" + num } value={ num } onClick={ this.assignNum }>{ num }</li>)
                    }
                    <li className='numChoice' id={ "choice" + 0 } value={0} onClick={ this.assignNum }>?</li>
                </ul>

                <div id='timer'>{ this.printTime() }</div>
                <div id='backBtn' onClick={ () => this.props.changeGameStatus() }>Back</div>
            </div>
        );
    }
}

export default Game;