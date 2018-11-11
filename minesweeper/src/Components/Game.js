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
    /**
     * Handle the left click on the grid
     * @param {*} i 
     */
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
    /**
     * Handle the right click on the grid
     * @param {*} e event
     * @param {*} i index of the clicked square
     */
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
    /**
     * Handle the form submission
     * @param {*} newGridSize 
     * @param {*} newBombNumber 
     */
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

/**
 * Check if the game is ended
 * @param {*} squares The current state of the game
 * @param {*} bombPlace The place of the bomb
 */
function isWinner(squares, bombPlace) {
    for (let bomb in bombPlace) {
        if (squares[bombPlace[bomb]] !== "🏴‍") {
            return false;
        }
    }
    return true;
}

function numSquare(numRow) {
    return numRow * numRow
}

/**
 * Return an array containing the index of the bomb. It avoids to take to times the same place
 * @param {*} indexes the list of available index
 * @param {*} bombNumber the number of bomb you want in the grid
 */
function chooseBombPlace(indexes, bombNumber) {
    let availablePlace = indexes
    let result = [];
    for (let i = 0; i < bombNumber; i++) {
        let indexes = Math.floor(Math.random() * availablePlace.length);
        result.push(availablePlace[indexes]);
        availablePlace.splice(indexes, 1);
    }
    return result;
}

/**
 * Transform the number of the square into a set of coordinates. The origin is on the top-left corner
 * @param {*} i The index of the sqaure
 * @param {*} rowSize the size of the grid
 */
function index2rowColumn(i, rowSize) {
    return ([Math.floor(i / rowSize), i % rowSize]);
}

/**
 * Transform coordinate to index in the grid
 * @param {*} coord [x,y], the coord of the square
 * @param {*} rowSize the size of the grid
 */
function rowColumn2index(coord, rowSize) {
    return rowSize * coord[0] + coord[1];
}

/**
 * Return an array with all the neighbours of a poit according to his coordinates
 * @param {*} coord [x,y], the coord of the square
 * @param {*} rowSize the size of the grid
 * @param {*} columnSize the size of the grid (the same because I choose to build a square board game)
 */

function getNeighboursCoord(coord, rowSize, columnSize) { //return an array with all the neighbours of a poit according to his coordinates
    let result = [];
    let row = coord[0];
    let column = coord[1];
    if (column - 1 >= 0) {
        result.push([row, column - 1])
    }
    if (column + 1 < columnSize) {
        result.push([row, column + 1])
    }
    if (row - 1 >= 0) {
        result.push([row - 1, column])
    }
    if (row + 1 < rowSize) {
        result.push([row + 1, column])
    }
    return result;
}

/**
 * Set up the grid Game where all the games attributes are stored
 * @param {*} rowNumber The size of the grid
 * @param {*} bombNumber The numbers of bomb you want in the grid
 */
function gridSetUp(rowNumber, bombNumber) {
    let squareNumber = numSquare(rowNumber);
    let indices = Array(squareNumber).fill().map((_, idx) => idx);
    let bombPlace = chooseBombPlace(indices, bombNumber);
    let result = Array(squareNumber).fill(0);
    for (let key in bombPlace) {
        let bombIndex = bombPlace[key];
        result[bombIndex] = "💣";
        let coord = index2rowColumn(bombIndex, rowNumber);
        let neighb = getNeighboursCoord(coord, rowNumber, rowNumber).map((d) => rowColumn2index(d, rowNumber)); //idexes' list of the neighbours
        for (let i in neighb) {
            if (!(bombPlace.indexOf(neighb[i]) >= 0)) { //if this is not the place of a bomb
                result[neighb[i]] += 1
            }
        }
    }
    return [result, bombPlace];
}

/**
 * A function to find the cluster containing the clicked empty square
 * @param {int} index The index of the clicked empty sqaure
 * @param {*} rowSize The size of the row
 * @param {*} gridGame The game grid containing the value of each square
 */
function exploreEmptySquare(index, rowSize, gridGame) { //return the list of square to display when  you click on a zero
    let visited = [];

    /**
     * Helping function for the DFS
     * @param {*} s The index of the square in the grid
     */
    function color(s) {
        visited.push(s)
    }

    /**
     * Depth First Search
     * @param {*} s The index of the square in the grid
     */
    function DFS(s) { //
        color(s);
        let coord = index2rowColumn(s, rowSize);
        let children = getNeighboursCoord(coord, rowSize, rowSize).map((d) => rowColumn2index(d, rowSize));
        for (let child in children) {
            if (visited.indexOf(children[child]) < 0) {
                if (gridGame[children[child]] === " ") {
                    DFS(children[child]);
                }
            }
        }
    }
    DFS(index); //here the list of the summit with zero who are neighbours to the choosen one

    //add the neighbours to visited
    for (let i in visited) {
        let coord = index2rowColumn(visited[i], rowSize);
        let neibh = getNeighboursCoord(coord, rowSize, rowSize).map((d) => rowColumn2index(d, rowSize));
        for (let n in neibh) {
            if (visited.indexOf(neibh[n]) < 0) {
                visited.push(neibh[n])
            }
        }
    }
    return visited;
}




