import React, { Component } from 'react';

class GameSetter extends Component {


    handleSubmit(e) {
        e.preventDefault();
        this.props.onChoose(this.refs.gridSize.value);
    }


    render() {//onChange={this.handleSubmit}onSubmit={this.handleSubmit}onChange={this.handleChange}
        return (
            <form id='choose-gridSize' onSubmit={this.handleSubmit.bind(this)}>
                <input type="text" required ref="gridSize" placeholder="Choose the grid size" />
                <input type="submit" value="Choose" />
            </form>
        );
    }
}

export default GameSetter;