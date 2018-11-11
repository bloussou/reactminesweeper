import React, { Component } from 'react';
import styles from './styles/GameSetter.css';

class GameSetter extends Component {

    handleSubmit(e) { //Handle the submit and check if the values enter in the form are integer
        e.preventDefault();
        let gridSize = parseInt(this.refs.gridSize.value);
        let bombNumber = parseInt(this.refs.bombNumber.value);
        if (isNaN(gridSize) || isNaN(bombNumber)) {
            alert("Please put integer in the form");
            return;
        }
        else {
            this.props.onChoose(this.refs.gridSize.value, this.refs.bombNumber.value);
        }
    }

    render() {
        return (
            <div id="box">
                <label id="Title">Start a new Game :</label>
                <form id='choose-gridSize' onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <label>
                            Choose the grid size :
                        <input type="text" required ref="gridSize" placeholder="Choose the grid size" />
                        </label>
                    </div>
                    <div>
                        <label>
                            Choose the number of bombs :
                        <input type="text" required ref="bombNumber" placeholder="Choose the bomb number" />
                        </label>
                    </div>
                    <div>
                        <input type="submit" value="Choose" />
                    </div>
                </form>
            </div>
        );
    }
}

export default GameSetter;