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
        let col = Array(rowSize).fill().map((_, i) => this.renderSquare(rowNumber * rowSize + i))//j * this.props.numRow +
        return (
            <div className="board-row">
                {col}
            </div>
        )
    }

    render() {
        let newArray = Array(parseInt(this.props.rowSize));
        let grid = newArray.fill().map((_, i) => {
            return this.renderRow(parseInt(this.props.rowSize), i)
        });
        return (
            <div>
                {grid}
            </div>
        );
    }
}

export default Board;

