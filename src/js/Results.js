import React from 'react'
import PropTypes from 'prop-types'
import Answers from './Answers'

Results.propTypes = {
    loadNextQuestion: PropTypes.bool.isRequired,
    allQuestions: PropTypes.array.isRequired,
    allAnswers: PropTypes.array.isRequired,
    onLoadResults: PropTypes.func.isRequired,
}

function Results({loadNextQuestion, allQuestions, allAnswers, onLoadResults}) {
    return (
        <div className={`results fade-out ${loadNextQuestion ? 'fade-out-active' : ''}`}>
            <div className="loader"><div className="icon"></div></div>
            <div className="results-overlay"></div>
            <h1>Here are your answers:</h1>
            <div className="answers">
                <Answers 
                    allQuestions={allQuestions}
                    allAnswers={allAnswers}
                />
            </div>
            <div className="text-center">
                <button className="btn btn-dark" onClick={(e)=>onLoadResults()}>Submit</button>
            </div>
        </div>
    )
}

export default Results
