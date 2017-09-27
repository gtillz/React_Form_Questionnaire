import React from 'react'
import PropTypes from 'prop-types'
import Answers from './Answers'

Results.propTypes = {
    loadNextQuestion: PropTypes.bool.isRequired,
    allQuestions: PropTypes.array.isRequired,
    allAnswers: PropTypes.array.isRequired,
    onLoadResults: PropTypes.func.isRequired,
    correctAnswers: PropTypes.array,
    resultsLoaded: PropTypes.bool.isRequired,
    onRestart: PropTypes.func.isRequired,
}

function Results({loadNextQuestion, allQuestions, allAnswers, onLoadResults, correctAnswers, resultsLoaded, onRestart}) {

    let numberOfCorrectAnswers = 0;
    correctAnswers && allQuestions.map((question, index)=>{
         correctAnswers[index] === allAnswers[index] && numberOfCorrectAnswers++;
    })

    return (
        <div className={`results fade-out ${loadNextQuestion ? 'fade-out-active' : ''}`}>
            <div className="loader"><div className="icon"></div></div>
            <div className="results-overlay"></div>
            <h1>{`${resultsLoaded ? `${numberOfCorrectAnswers} out of ${allQuestions.length} correct!` : 'Here are your answers:'}`}</h1>
            <div className="answers">
                <Answers 
                    allQuestions={allQuestions}
                    allAnswers={allAnswers}
                    correctAnswers={correctAnswers}
                />
            </div>
            <div className="text-center">
                {
                    resultsLoaded ? 
                        <button className="btn btn-dark" onClick={(e)=>onRestart()}>Start Again</button>
                    :
                        <button className="btn btn-dark" onClick={(e)=>onLoadResults()}>Submit</button>
                }
            </div>
        </div>
    )
}

export default Results
