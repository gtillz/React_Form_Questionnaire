import React, { Component } from 'react'
import PropTypes from 'prop-types'

class NiceButton extends Component {
    //method to change index number to letter
        //or can use String.fromCharCode(65 + index) in-line
    // getLetter(index){
    //     const letter = ['A', 'B', 'C'];
    //     return letter[index]
    // }

    handleClick = (e) => {
        const {choice, onSelectAnswer} = this.props;
        
        //add css selected amd highlight class when selected
        this.button.classList.add('is-selected', 'is-highlighted')
        
        setTimeout((e)=>{
            onSelectAnswer(choice); 
        }, 500)
    }

    render() {
        const {choice, index, onSelectAnswer} = this.props;
        return (
            <button ref={(input) => this.button = input} className="btn btn-huge" onClick={(e) => this.handleClick(e)}>
                <span className="letter">{String.fromCharCode(65 + index)}</span>{choice}
            </button>
        )   
    }
}

NiceButton.propTypes = {
    choice: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    onSelectAnswer: PropTypes.func.isRequired,
}

export default NiceButton;
