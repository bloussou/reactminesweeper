import React from "react";
import Square from './Square';

class Board extends React.Component {
    /**
     * It builds the square according to their indexes in the grid
     * @param {*} i index
     */
    renderSquare(i) {
        return (
            <Square value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                onRightClick={(event) => this.props.onRightClick(event, i)} />
        );
    }

    /**
     * It builds a row according to the size of the row number of the row (zero for the top row, rowSize-1 for the bottom row)
     * @param {*} rowSize 
     * @param {*} rowNumber 
     */
    renderRow(rowSize, rowNumber) {
        let col = Array(rowSize).fill().map((_, i) => this.renderSquare(rowNumber * rowSize + i))
        return (
            <div className="board-row">
                {col}
            </div>
        )
    }

    render() {
        let grid = Array(parseInt(this.props.rowSize)).fill().map((_, i) => this.renderRow(parseInt(this.props.rowSize), i));
        return (
            <div>
                {grid}
            </div>
        );
    }
}

export default Board;

