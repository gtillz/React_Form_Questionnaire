import React from 'react'
import PropTypes from 'prop-types'

Answers.propTypes = {
    allQuestions: PropTypes.array.isRequired,
    allAnswers: PropTypes.array.isRequired,
    correctAnswers: PropTypes.array
}

function Answers({allQuestions, allAnswers, correctAnswers}) {
    return (
        <ol>
            { 
                allQuestions.map((question, index) => {
                    const isCorrect = correctAnswers && correctAnswers[index] === allAnswers[index]
                    return <li key={question.question} className={`${isCorrect ? 'text-success' : 'text-danger'}`}>{question.question} <br /><strong>{allAnswers[index]}</strong>
                        {(correctAnswers && !isCorrect) && <span className='correct-answer'> {correctAnswers[index]}</span>}
                        </li>
                })
            }
        </ol>
    )
}

export default Answers
