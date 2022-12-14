import React, { useState, useEffect } from "react";
import Intro from "./Components/Intro";
import Questions from "./Components/Questions";
import ErrorMessage from "./Components/ErrorMessage";
export default function App() {
  const [start, setStart] = useState(true);
  const [questions, setQuestions] = useState();
  const [checkAns, setCheckAns] = useState(false);
  const [score, setScore] = useState(0);
  const [reset, setReset] = useState(false);
  const [questionCheck, setQuestionCheck] = useState([1]);
  const [error, setError] = useState(false);
  
  function startGame() {
    setStart(false);
    console.log("clicked start game");
  }

  function newQuestions() {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }

  function resetGame() {
    newQuestions();
    resetStates();
    setQuestionCheck([1]);
  }

  function resetStates() {
    setReset(true);
    setScore(0);
    setCheckAns(false);
  }

  function addScore() {
    setScore((prevScore) => prevScore + 1);
  }
  console.log("component rendered");

  React.useEffect(() => {
    const abortController = new AbortController();
    newQuestions();

    return () => {
      abortController.abort();
    };
  }, [reset]);

  if (questions) {
    console.log(questions.results);

    var fuckingQuestions = questions.results.map((item) => {
      return (
        <Questions
          key={item.question}
          q={item.question}
          correctAns={item.correct_answer}
          incorrectAns={item.incorrect_answers}
          checked={checkAns}
          addScore={addScore}
          questionCheck={questionChecked}
        />
      );
    });
  }

  function handleCheckAns() {
    if (questionCheck.length >= 21) {
      setCheckAns(true);
    } else {
      setError(true);
      setInterval(() => {
        setError(false);
      }, 2000);
    }
  }

  function questionChecked() {
    setQuestionCheck((prevState) => [...prevState, 1]);
  }

  return (
    <main>
      {error && <ErrorMessage />}
      <svg
        className="introo--left-blob"
        width="148"
        height="118"
        viewBox="0 0 148 118"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M-5.55191 4.90596C35.9614 1.77498 82.2425 -9.72149 112.306 19.1094C145.581 51.0203 155.282 102.703 142.701 147.081C130.767 189.18 93.7448 220.092 51.8208 232.476C16.5281 242.902 -15.4332 218.605 -49.1007 203.738C-85.3375 187.737 -133.641 182.993 -145.741 145.239C-158.358 105.868 -132.269 64.5881 -103.064 35.3528C-77.7328 9.99541 -41.2727 7.60006 -5.55191 4.90596Z"
          fill="#DEEBF8"
        />
      </svg>
      <svg
        className="introo--right-blob"
        width="158"
        height="141"
        viewBox="0 0 158 141"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M63.4095 81.3947C35.1213 50.8508 -2.68211 21.7816 1.17274 -19.6933C5.43941 -65.599 39.854 -105.359 82.4191 -123.133C122.797 -139.994 170.035 -130.256 205.822 -105.149C235.947 -84.0141 236.823 -43.8756 246.141 -8.27104C256.17 30.0508 282.521 70.8106 260.501 103.779C237.538 138.159 188.991 143.432 147.931 138.768C112.318 134.723 87.7505 107.677 63.4095 81.3947Z"
          fill="#FFFAD1"
        />
      </svg>
      {start && <Intro onClick={startGame} />}
      {!start && fuckingQuestions}
      {(!checkAns && !start && (
        <div className="button--container">
          <button className="game--reset-button" onClick={resetGame}>
            Reset Game
          </button>
          <button className="game--check-button" onClick={handleCheckAns}>
            Check Answers
          </button>
        </div>
      )) ||
        (checkAns && (
          <div className="result--text-container">
            <h4 className="result--text">
              You scored {score}/{questions.results.length} correct answers
            </h4>
            <button className="game--check-button" onClick={resetGame}>
              Play Again
            </button>
          </div>
        ))}
    </main>
  );
}
