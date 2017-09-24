import React from 'react';
import data from './data/Data';
import Question from './Question';
import Results from './Results';

class App extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        allQuestions: data.allQuestions,
        currentQuestion: data.allQuestions[0],
        progress: 0,
        allAnswers: [],
        loadNextQuestion: false,
        showResults: false
      }
    }

    //using an arrow function will automatically bind the method
    onSelectAnswer = (answer) => {
     const {allAnswers} = this.state;

      this.setState({
        allAnswers: [...allAnswers, answer]
      }, this.goToNextQuestion())

    }

    goToNextQuestion = () => {
      const {allQuestions, progress} = this.state;
      this.setState({
        loadNextQuestion: true
      })
      
      setTimeout(()=>{
        if(progress < allQuestions.length - 1){
          this.setState({
            progress: progress + 1,
            currentQuestion: allQuestions[progress + 1],
            loadNextQuestion: false
          })
        } else {
          this.setState({
            loadNextQuestion: false,
            showResults: true
          })
        }
      }, 300)
    }

    onLoadResults = () => {
      console.log('Load Results')
    }

    render(){
      const {currentQuestion, loadNextQuestion, showResults, allAnswers, allQuestions} = this.state;

        return (
            <div>
                  
              {/* Header - start */}
              <header>
                  <img className={`fade-out ${loadNextQuestion ? 'fade-out-active' : ''}`}
                  src="https://ihatetomatoes.net/react-tutorials/abc-quiz/images/plane.svg" />
              </header>
              {/* Header - end */}

              {/* Content - start */}
              <div className={`content`}>

                {/* Progress - start */}
                <div className="progress-container">
                  <div className="progress-label">1 of 5 answered</div>
                  <div className="progress">
                    <div className="progress-bar" style={{'width': `20%`}}>
                      <span className="sr-only">20% Complete</span>
                    </div>
                  </div>
                </div>
                {/* Progress - end */}

                {
                  !showResults ? <Question 
                    currentQuestion={currentQuestion}
                    onSelectAnswer={this.onSelectAnswer}
                    loadNextQuestion={loadNextQuestion}
                  /> : <Results 
                    loadNextQuestion={loadNextQuestion}
                    allQuestions={allQuestions}
                    allAnswers={allAnswers}
                    onLoadResults={this.onLoadResults}
                  />
                }

              </div>
              {/* Content - end */}

              {/* Navigation - start */}
              <div className={`navigation text-center is-active`}>
                <button className={`arrow`}>
                    <img src="https://ihatetomatoes.net/react-tutorials/abc-quiz/fonts/navigation-left-arrow.svg" />
                </button>
                <button disabled className={`arrow is-disabled`}>
                    <img src="https://ihatetomatoes.net/react-tutorials/abc-quiz/fonts/navigation-right-arrow.svg" />
                </button>
              </div>
              {/* Navigation - end */}

            </div>
        )
    }
}

export default App;