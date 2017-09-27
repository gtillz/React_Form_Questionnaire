import React, { Component } from 'react'
import PropTypes from 'prop-types'

class NiceButton extends Component {
    
    // new ES6 'getter' method
    get choiceSelected(){
        const {allAnswers, choice} = this.props;
        // returns true is the choice is in the allAnswers Array
        return allAnswers.includes(choice);
    }

    handleClick = (e) => {
        const {choice, onSelectAnswer} = this.props;
        
        //add css selected amd highlight class when selected
        this.button.classList.add('is-selected', 'is-highlighted')
        
        setTimeout((e)=>{
            onSelectAnswer(choice); 
        }, 500)
    }
    
    //method to change index number to letter
        //or can use String.fromCharCode(65 + index) in-line
    // getLetter(index){
    //     const letter = ['A', 'B', 'C'];
    //     return letter[index]
    // }

    render() {
        const {choice, index, onSelectAnswer, allAnswers} = this.props;
        return (
            <button ref={(input) => this.button = input} className={`btn btn-huge ${this.choiceSelected ? 'is-selected' : ''}`} onClick={(e) => this.handleClick(e)}>
                <span className="letter">{String.fromCharCode(65 + index)}</span>{choice}
            </button>
        )   
    }
}

NiceButton.propTypes = {
    choice: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    onSelectAnswer: PropTypes.func.isRequired,
    allAnswers: PropTypes.array.isRequired,
}

export default NiceButton;
