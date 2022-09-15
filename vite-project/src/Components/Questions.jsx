import React from "react";
import { decode } from "html-entities";
import { useEffect } from "react";
import { useState } from "react";

export default function Questions(props) {
  const {incorrectAns} = props
  const decodedQ = decode(props.q);
  const correct = decode(props.correctAns);
  const wrong = incorrectAns;
  // const [testChoices, setTestChocices] = useState(incorrectAns.push(correct));
  const [choices, setChoices] = React.useState([{}]);
  const [testState, setTestState] = useState(false)

 
  /* Randomize array in-place using Durstenfeld shuffle algorithm */
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
 

  function checkAnswer(e) {
    if (e.target.textContent === correct) {
      console.log("Correct Answer!");
    }
  }

  useEffect(()=>{
    wrong.push(correct);
    shuffleArray(wrong);
    setTestState(true);
    console.log(wrong);
  }, [])

  //recreate the choices by mapping over the array and making it an object
    // const getChoices = wrong.map((x) => {
    //   choices.push({ choice: x, checked: false });
    // });

  // getChoices;
  // console.log(choices);

  const wrongAnswersMapped = wrong.map((x) => {
    return (
      <button className="question--answer" onClick={checkAnswer}>
        {decode(x)}
      </button>
    );
  });

  //when you click a button, it stays there and dapat isa lang nakaclick na button
  return (
    <section className="question--container">
      <p className="question--question">{decodedQ}</p>
      <div className="question--answer-container">{testState && wrongAnswersMapped}</div>
    </section>
  );
}
