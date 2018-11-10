import React from "react";

function Square(props) {
    return (
        <button className="square" onClick={props.onClick} onContextMenu={props.onRightClick} style={{ fontSize: 5, width: 10, height: 10 }}>
            {props.value}
        </button>
    );
}

export default Square;