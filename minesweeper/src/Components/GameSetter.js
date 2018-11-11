import React, { Component } from 'react';
import styles from './styles/GameSetter.css';

class GameSetter extends Component {


    handleSubmit(e) {
        e.preventDefault();
        this.props.onChoose(this.refs.gridSize.value, this.refs.bombNumber.value);
    }


    render() {//onChange={this.handleSubmit}onSubmit={this.handleSubmit}onChange={this.handleChange}
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