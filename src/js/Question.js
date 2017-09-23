import React from 'react'
import PropTypes from 'prop-types'

Question.propTypes = {
    currentQuestion: PropTypes.object.isRequired
}

function Question({currentQuestion}) {
    const {question} = currentQuestion;
    return (
        <div className={`question`}>

            <h1>{question}</h1>

                {/* Choices - start */}
                <div className="choices">
                    
                    {/* Buttons - start */}
                    <button className="btn btn-huge is-selected"><span className="letter">A</span> Melbourne</button>
                    <button className="btn btn-huge"><span className="letter">B</span> New York</button>
                    <button className="btn btn-huge"><span className="letter">C</span> London</button>
                    {/* Buttons - end */}

                </div>
            {/* Choices - end */}

        </div>
    )
}

export default Question
