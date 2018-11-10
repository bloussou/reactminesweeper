import React from "react";

function Square(props) {
    return (
        <button className="square" onClick={props.onClick} onContextMenu={props.onRightClick}>
            {props.value}
        </button>
    );
}

export default Square;