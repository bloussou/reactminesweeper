import React from "react";
import Square from './Square';

class Board extends React.Component {

    constructor(props) {
        super(props)
    }

    renderSquare(i) {
        return (
            <Square value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                onRightClick={(event) => this.props.onRightClick(event, i)} />
        );
    }

    renderRow(rowSize, rowNumber) {
        var col = Array(rowSize).fill().map((_, i) => this.renderSquare(rowNumber * rowSize + i))//j * this.props.numRow +
        return (
            <div className="board-row">
                {col}
            </div>
        )
    }

    render() {
        var grid = Array(this.props.rowSize).fill().map((_, i) => this.renderRow(this.props.rowSize, i));
        return (
            <div>
                {grid}
            </div>
        );
    }
}

export default Board;

