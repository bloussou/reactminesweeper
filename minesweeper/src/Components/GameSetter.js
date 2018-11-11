import React, { Component } from 'react';

class GameSetter extends Component {


    handleSubmit(e) {
        e.preventDefault();
        this.props.onChoose(this.refs.gridSize.value, this.refs.bombNumber.value);
    }


    render() {//onChange={this.handleSubmit}onSubmit={this.handleSubmit}onChange={this.handleChange}
        return (
            <div>
                <label>Start a new Game :</label>
                <form id='choose-gridSize' onSubmit={this.handleSubmit.bind(this)}>
                    <label>
                        Choose the grid size :
                        <input type="text" required ref="gridSize" placeholder="Choose the grid size" />
                    </label>
                    <label>
                        Choose the number of bombs :
                        <input type="text" required ref="bombNumber" placeholder="Choose the bomb number" />
                    </label>
                    <input type="submit" value="Choose" />
                </form>
            </div>
        );
    }
}

export default GameSetter;