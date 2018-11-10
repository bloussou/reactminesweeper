import React from "react";
import Board from './Board';

class Game extends React.Component {
    constructor(props) {
        super(props);
        const bombNumber = 2;
        const squareNumber = 9;
        const indices = Array(squareNumber).fill().map((_, idx) => idx);
        console.log(chooseBombPlace(indices, bombNumber));
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            hasBeenClicked: false,
        };
    }

    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (squares[i]) {
            return;
        }


        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            xIsNext: !this.state.xIsNext,
            hasBeenClicked: true,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className="game">
                <Board
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}
                />
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}
export default Game;

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function chooseBombPlace(indices, bombNumber) {
    var availablePlace = indices
    var result = [];
    for (var i = 0; i < bombNumber; i++) {
        var index = Math.floor(Math.random() * availablePlace.length);
        result.push(availablePlace[index]);
        availablePlace.splice(index, 1);
    }
    return result;
}




