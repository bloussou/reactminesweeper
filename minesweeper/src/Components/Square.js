import React from "react";

function Square(props) {
    return (
        <button className="square" onClick={props.onClick} onContextMenu={props.onRightClick} style={{ fontSize: 10, width: 30, height: 30 }}>
            {props.value}
        </button>
    );
}

export default Square;