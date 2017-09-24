import React from 'react';
import PropTypes from 'prop-types';
import Choices from './Choices'

Question.propTypes = {
    currentQuestion: PropTypes.object.isRequired,
    onSelectAnswer: PropTypes.func.isRequired,
    loadNextQuestion: PropTypes.bool.isRequired,
}

function Question({currentQuestion, onSelectAnswer, loadNextQuestion}) {
    const {question, choices} = currentQuestion;
    return (
        <div className={`question fade-out ${loadNextQuestion ? 'fade-out-active' : ''}`}>
            <h1>{question}</h1>
                <Choices 
                    choices={choices}
                    onSelectAnswer={onSelectAnswer}
                />
        </div>
    )
}

export default Question
