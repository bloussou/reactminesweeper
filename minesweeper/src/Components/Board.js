import React from "react";
import Square from './Square';

class Board extends React.Component {

    renderSquare(i) {// It builds the square according to their numbers in the grid
        return (
            <Square value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                onRightClick={(event) => this.props.onRightClick(event, i)} />
        );
    }

    renderRow(rowSize, rowNumber) { //It builds the grid row after row
        let col = Array(rowSize).fill().map((_, i) => this.renderSquare(rowNumber * rowSize + i))
        return (
            <div className="board-row">
                {col}
            </div>
        )
    }

    render() { //It renders the grid
        let grid = Array(parseInt(this.props.rowSize)).fill().map((_, i) => this.renderRow(parseInt(this.props.rowSize), i));
        return (
            <div>
                {grid}
            </div>
        );
    }
}

export default Board;

