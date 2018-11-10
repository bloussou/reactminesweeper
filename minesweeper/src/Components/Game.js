import React from "react";
import Board from './Board';

class Game extends React.Component {
    constructor(props) {
        super(props);
        const bombNumber = 2;
        const numRow = 4;
        this.state = {
            history: [{
                squares: Array(numRow * numRow).fill(null),
            }],
            xIsNext: true,
            hasBeenClicked: false,
            numRow: 4,
            gridGame: gridSetUp(numRow, bombNumber),
        };
    }

    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (this.state.gridGame[i] === 0) {
            var listShowed = exploreEmptySquare(i, this.state.numRow, squares);
            for (var j in listShowed) {
                squares[listShowed[j]] = this.state.gridGame[listShowed[j]];
            }
            this.setState({
                history: history.concat([{
                    squares: squares,
                }]),
                xIsNext: !this.state.xIsNext,
                hasBeenClicked: true,
            });
            return;
        }
        else {
            squares[i] = this.state.gridGame[i];

        }
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
function numSquare(numRow) { //we firstly build only square grid
    return numRow * numRow
}

function chooseBombPlace(indices, bombNumber) { //Return the indices of the bomb in the available list of places
    var availablePlace = indices
    var result = [];
    for (var i = 0; i < bombNumber; i++) {
        var index = Math.floor(Math.random() * availablePlace.length);
        result.push(availablePlace[index]);
        availablePlace.splice(index, 1);
    }
    return result;
}

function indices2rowColumn(i, rowSize) {
    return ([Math.floor(i / rowSize), i % rowSize]);
}

function rowColumn2indice(coord, rowSize) {
    return rowSize * coord[0] + coord[1];
}

function getNeighboursCoord(coord, rowSize, columnSize) { //return an array with all the neighbours of a poit according to his coordinates
    var result = [];
    var row = coord[0];
    var column = coord[1];
    if (column - 1 >= 0) {
        result.push([row, column - 1])
        if (row - 1 >= 0) {
            result.push([row - 1, column - 1])
        }
        if (row + 1 < rowSize) {
            result.push([row + 1, column - 1])
        }
    }
    if (column + 1 < columnSize) {
        result.push([row, column + 1])
        if (row - 1 >= 0) {
            result.push([row - 1, column + 1])
        }
        if (row + 1 < rowSize) {
            result.push([row + 1, column + 1])
        }
    }
    if (row - 1 >= 0) {
        result.push([row - 1, column])
    }
    if (row + 1 < rowSize) {
        result.push([row + 1, column])
    }
    return result;
}

function gridSetUp(rowNumber, bombNumber) { //Set up the grid for the start
    var squareNumber = numSquare(rowNumber);
    var indices = Array(squareNumber).fill().map((_, idx) => idx);
    var bombPlace = chooseBombPlace(indices, bombNumber);
    var result = Array(squareNumber).fill(0);
    for (var key in bombPlace) {
        var bombIndice = bombPlace[key];
        result[bombIndice] = "💣";
        var coord = indices2rowColumn(bombIndice, rowNumber);
        var neighb = getNeighboursCoord(coord, rowNumber, rowNumber).map((d) => rowColumn2indice(d, rowNumber)); //indices' list of the neighbours
        for (var i in neighb) {
            if (!(bombPlace.indexOf(neighb[i]) >= 0)) { //if this is not the place of a bomb
                result[neighb[i]] += 1
            }
        }
    }
    return result;
}

function exploreEmptySquare(indice, rowSize, gridGame) { //return the list of square to display when  you click on a zero
    var visited = [];
    function color(s) {
        visited.push(s)
    }

    function DFS(s) {
        color(s);
        var coord = indices2rowColumn(s, rowSize);
        var children = getNeighboursCoord(coord, rowSize, rowSize).map((d) => rowColumn2indice(d, rowSize));
        for (var child in children) {
            if (visited.indexOf(children[child]) < 0) {
                if (gridGame[children[child]] === 0) {
                    DFS(children[child]);
                }
            }
        }
    }
    DFS(indice); //here the list of the summit with zero who are neighbours

    //add the neighbours to visited
    for (var i in visited) {
        var coord = indices2rowColumn(visited[i], rowSize);
        var neibh = getNeighboursCoord(coord, rowSize, rowSize).map((d) => rowColumn2indice(d, rowSize));
        for (var n in neibh) {
            if (visited.indexOf(neibh[n] < 0)) {
                visited.push(neibh[n])
            }
        }
    }
    return visited;
}




