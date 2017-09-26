import React from 'react'
import PropTypes from 'prop-types';
import arrowLeftImg from '../images/navigation-left-arrow.svg';
import arrowRightImg from '../images/navigation-right-arrow.svg';

Arrow.propTypes = {
    direction: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired,
    allAnswers: PropTypes.array.isRequired,
}

function Arrow({direction, progress, allAnswers}) {
    const image = direction === 'left' ? arrowLeftImg : arrowRightImg;
    const isDisabled = (direction === 'left' && progress === 0) ||
                       (direction === 'right' && !allAnswers[progress]);
    return (
        <button disabled={isDisabled} className={`arrow ${isDisabled ? 'is-disabled' : ''}`}>
            <img src={image} />
        </button>
    )
}

export default Arrow
