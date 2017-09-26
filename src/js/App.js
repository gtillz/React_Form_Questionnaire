import React from 'react';
import data from './data/Data';
import Question from './Question';
import Results from './Results';
import Progress from './Progress';
import Navigation from './Navigation';
import Arrow from './Arrow';

class App extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        allQuestions: data.allQuestions,
        currentQuestion: data.allQuestions[0],
        progress: 0,
        allAnswers: [],
        loadNextQuestion: false,
        showResults: false,
        loadingResults: false,
        correctAnswers: null
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
      this.setState({
        loadingResults: true
      })

      fetch('https://api.myjson.com/bins/zgpjb')
      .then(response => response.json())
      .then(parsedJSON => {
        const correctAnswers = parsedJSON.correctAnswers;

        this.setState({
          correctAnswers,
          loadingResults: false,
          resultsLoaded: true
        })

      })
      .catch(error => {
        console.log('fetching answers failed', error)
        this.setState({
          loadingResults: false,
          resultsLoaded: true
        })
      })

    }

    render(){
      const {currentQuestion, loadNextQuestion, showResults, allAnswers, allQuestions, loadingResults, correctAnswers, resultsLoaded, progress} = this.state;
      const navIsActive = allAnswers.length > 0;
        return (
            <div className={`${loadingResults ? 'is-loading-results' : ''} ${resultsLoaded ? 'is-showing-results' : 'no-results-loaded'}`}>         
              {/* Header - start */}
              <header>
                  <img className={`fade-out ${loadNextQuestion ? 'fade-out-active' : ''}`}
                  src={currentQuestion.image} />
              </header>
              {/* Header - end */}
              <div className={`content`}>
                <Progress 
                  progress={allAnswers.length}
                  total={allQuestions.length}
                />
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
                    correctAnswers={correctAnswers}
                  />
                }
              </div>

              {/* Navigation */}
              <div className={`navigation text-center ${navIsActive ? 'is-active' : ''}`}>
                <Arrow 
                  direction='left'
                  allAnswers={allAnswers}
                  progress={progress}
                />
                <Arrow 
                  direction='right'
                  allAnswers={allAnswers}
                  progress={progress}
                />
              </div>
              {/* Navigation - end */}
            </div>
        )
    }
}

export default App;