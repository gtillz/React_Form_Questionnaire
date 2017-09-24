import React from 'react'
import PropTypes from 'prop-types'

Answers.propTypes = {
    allQuestions: PropTypes.array.isRequired,
    allAnswers: PropTypes.array.isRequired,
}

function Answers({allQuestions, allAnswers}) {
    return (
        <ol>
            { 
                allQuestions.map((question, index) => {
                    return <li key={question.question}>{question.question} <br /><strong>{allAnswers[index]}</strong></li>
                })
            }
        </ol>
    )
}

export default Answers
