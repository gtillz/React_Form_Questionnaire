import React from 'react';
import data from './data/Data';
import Question from './Question';
import Results from './Results';
import Progress from './Progress';
import Arrow from './Arrow';
import defaultImage from '../images/truck.svg';

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
        correctAnswers: null,
        resultsLoaded: false
      }
    }

    //using an arrow function will automatically bind the method
    onSelectAnswer = (answer) => {
      const {allAnswers, progress} = this.state;
      const currentAnswer = allAnswers[progress];

      if(currentAnswer){
      //replace
        allAnswers[progress] = answer
        this.setState({
          allAnswers
        }, this.goToNextQuestion())
      } else {
        this.setState({
          allAnswers: [...allAnswers, answer]
        }, this.goToNextQuestion())
      }
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

    goToPreviousQuestion = () => {
      const {allQuestions, progress, showResults} = this.state;
      
      this.setState({
        loadNextQuestion: true
      })
      
      setTimeout(()=>{
        (progress > 0 && !showResults) &&
          this.setState({
            progress: progress - 1,
            currentQuestion: allQuestions[progress - 1],
            loadNextQuestion: false
          })
        
        showResults &&
          this.setState({
            showResults: false,
            loadNextQuestion: false,
          })
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

    onRestart = () => {
      this.setState({
        currentQuestion: data.allQuestions[0],
        progress: 0,
        allAnswers: [],
        showResults: false,
        correctAnswers: null,
        resultsLoaded: false
      })
    }

    render(){
      const {currentQuestion, loadNextQuestion, showResults, allAnswers, allQuestions, loadingResults, correctAnswers, resultsLoaded, progress} = this.state;
      const navIsActive = allAnswers.length > 0;
      const {image} = currentQuestion;
      const headerImage = !showResults ? image : defaultImage

        return (
            <div className={`${loadingResults ? 'is-loading-results' : ''} ${resultsLoaded ? 'is-showing-results' : 'no-results-loaded'}`}>         
              {/* Header - start */}
              <header>
                  <img className={`fade-out ${loadNextQuestion ? 'fade-out-active' : ''}`}
                  src={headerImage} />
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
                    allAnswers={allAnswers}
                  /> : <Results 
                    loadNextQuestion={loadNextQuestion}
                    allQuestions={allQuestions}
                    allAnswers={allAnswers}
                    onLoadResults={this.onLoadResults}
                    correctAnswers={correctAnswers}
                    resultsLoaded={resultsLoaded}
                    onRestart={this.onRestart}
                  />
                }
              </div>

              {/* Navigation */}
              <div className={`navigation text-center ${navIsActive ? 'is-active' : ''}`}>
                <Arrow 
                  direction='left'
                  allAnswers={allAnswers}
                  progress={progress}
                  goToPreviousQuestion={this.goToPreviousQuestion}
                  showResults={showResults}
                />
                <Arrow 
                  direction='right'
                  allAnswers={allAnswers}
                  progress={progress}
                  goToNextQuestion={this.goToNextQuestion}
                  showResults={showResults}                  
                />
              </div>
              {/* Navigation - end */}
            </div>
        )
    }
}

export default App;