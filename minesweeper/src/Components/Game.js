import React from "react";
import Board from './Board';
import GameSetter from './GameSetter';

class Game extends React.Component {
    constructor(props) {
        super(props);
        const bombNumber = 10;
        const numRow = 8;
        let gridGameResult = gridSetUp(numRow, bombNumber);
        this.state = {
            history: [{
                squares: Array(numRow * numRow).fill("."),
            }],

            numRow: numRow,
            bombNumber: bombNumber,
            gridGame: gridGameResult[0].map((d) => (d === 0 ? " " : d)),
            bombPlace: gridGameResult[1],
        };
    }

    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (this.state.gridGame[i] === " ") {
            let listShowed = exploreEmptySquare(i, this.state.numRow, this.state.gridGame);
            for (let j in listShowed) {
                squares[listShowed[j]] = this.state.gridGame[listShowed[j]];
            }
            this.setState({
                history: history.concat([{
                    squares: squares,
                }]),
            });
        }
        else if (this.state.gridGame[i] === "💣") {
            for (let j in squares) {
                squares[j] = this.state.gridGame[j];
            }
            this.setState({
                history: history.concat([{
                    squares: squares,
                }]),
            });
            alert("you loose !")
        }
        else {
            squares[i] = this.state.gridGame[i];
        }
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
        });
    }

    handleRightClick(e, i) {
        e.preventDefault();
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (squares[i] === ".") {
            squares[i] = "🏴‍"
        }
        else if (squares[i] === "🏴‍") {
            squares[i] = ".";
        }
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
        });
        return;
    }

    onChoose(newGridSize, newBombNumber) {
        let gridGameResult = gridSetUp(newGridSize, newBombNumber);
        this.setState({
            history: [{
                squares: Array(newGridSize * newGridSize).fill("."),
            }],
            numRow: newGridSize,
            bombNumber: newBombNumber,
            gridGame: gridGameResult[0].map((d) => (d === 0 ? " " : d)),
            bombPlace: gridGameResult[1],
        });
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = isWinner(current.squares, this.state.bombPlace);
        let status;
        if (winner) {
            status = 'You Win !!!!';
            current.squares = this.state.gridGame;
        }
        return (
            <div>
                <GameSetter onChoose={(newGridSize, newBombNumber) => this.onChoose(newGridSize, newBombNumber)} />
                <Board
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}
                    onRightClick={(e, i) => this.handleRightClick(e, i)}
                    rowSize={this.state.numRow}
                />
                <div className="game-info">
                    <div>{status}</div>
                </div>
            </div >
        );
    }
}
export default Game;

function isWinner(squares, bombPlace) {
    //check Win
    for (let bomb in bombPlace) {
        if (squares[bombPlace[bomb]] !== "🏴‍") {
            return false;
        }
    }
    return true;
}
function numSquare(numRow) { //we firstly build only square grid
    return numRow * numRow
}

function chooseBombPlace(indices, bombNumber) { //Return the indices of the bomb in the available list of places
    let availablePlace = indices
    let result = [];
    for (let i = 0; i < bombNumber; i++) {
        let index = Math.floor(Math.random() * availablePlace.length);
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
    let result = [];
    let row = coord[0];
    let column = coord[1];
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
    let squareNumber = numSquare(rowNumber);
    let indices = Array(squareNumber).fill().map((_, idx) => idx);
    let bombPlace = chooseBombPlace(indices, bombNumber);
    let result = Array(squareNumber).fill(0);
    for (let key in bombPlace) {
        let bombIndice = bombPlace[key];
        result[bombIndice] = "💣";
        let coord = indices2rowColumn(bombIndice, rowNumber);
        let neighb = getNeighboursCoord(coord, rowNumber, rowNumber).map((d) => rowColumn2indice(d, rowNumber)); //indices' list of the neighbours
        for (let i in neighb) {
            if (!(bombPlace.indexOf(neighb[i]) >= 0)) { //if this is not the place of a bomb
                result[neighb[i]] += 1
            }
        }
    }
    return [result, bombPlace];
}

function exploreEmptySquare(indice, rowSize, gridGame) { //return the list of square to display when  you click on a zero
    let visited = [];
    function color(s) {
        visited.push(s)
    }

    function DFS(s) {
        color(s);
        let coord = indices2rowColumn(s, rowSize);
        let children = getNeighboursCoord(coord, rowSize, rowSize).map((d) => rowColumn2indice(d, rowSize));
        for (let child in children) {
            if (visited.indexOf(children[child]) < 0) {
                if (gridGame[children[child]] === " ") {
                    DFS(children[child]);
                }
            }
        }
    }
    DFS(indice); //here the list of the summit with zero who are neighbours
    //add the neighbours to visited
    for (let i in visited) {
        let coord = indices2rowColumn(visited[i], rowSize);
        let neibh = getNeighboursCoord(coord, rowSize, rowSize).map((d) => rowColumn2indice(d, rowSize));
        for (let n in neibh) {
            if (visited.indexOf(neibh[n]) < 0) {
                visited.push(neibh[n])
            }
        }
    }
    return visited;
}




