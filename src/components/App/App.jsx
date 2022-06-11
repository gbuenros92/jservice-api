// Hooks
import { useState } from 'react'

// Components
import Question from '../Question/Question';
import Answer from '../Answer/Answer';

// CSS
import './App.css';

function App() {

  const [triviaData, setTriviaData] = useState({
    question: '',
    answer: '',
    category: '',
    points: 0,
    showAnswer: false
  })
  const [showAnswer, setShowAnswer] = useState(false)
  const [score, setScore] = useState(0)

  const handleClick = async () => {
    setShowAnswer(false)

    try {
      const response = await fetch('http://jservice.io/api/random')
      const jData = await response.json()
      const data = jData[0]

      if (!data.question || !data.answer || !data.value || !data.category.title) {
        handleClick()
      } else {
        const placeHolder = {
          question: data.question,
          answer: data.answer,
          category: data.category.title,
          points: data.value,
          showAnswer: false
        }
        setTriviaData(placeHolder)
      }

    } catch (err) {
      console.log(err)
    }
  }

  const handleToggle = e => {
    setShowAnswer(!showAnswer)
    setTriviaData({ ...triviaData, showAnswer: !showAnswer })
  }

  const handleScore = e => {
    let points = triviaData.points
    const newScore = score + (e.target.name === "increase" ? points : points * -1)

    setScore(newScore)
  }

  const handleReset = e => {
    setScore(0)
  }

  return (
    <div className="App">
      <div id="score-container">
        <h1 id="title">!Jeopardy</h1>
        <h2 id="score-txt">Score:&ensp;{score}</h2>
        {
          (triviaData.question)
          &&
          <>
            <button id="increase" name="increase" onClick={handleScore} disabled={!showAnswer}>I Got it Right!</button>
            <button id="decrease" name="decrease" onClick={handleScore} disabled={!showAnswer}>No Such Luck</button>
            <button id="reset" name="reset" onClick={handleReset}>Reset Score</button>
          </>
        }
      </div>

      <div id="game-btns">
        <button id="get-q" onClick={handleClick} autoFocus>Get Question</button>
        <button id="get-a" onClick={handleToggle} disabled={showAnswer}>Reveal Answer</button>
      </div>

      <div id="game">
        <Question triviaData={triviaData} />

        {(triviaData.showAnswer) && <Answer triviaData={triviaData} />}
      </div>
    </div>
  );
}

export default App;
