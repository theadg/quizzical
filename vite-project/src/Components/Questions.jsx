import React from "react";
import { decode } from "html-entities";
import { useEffect } from "react";
import { useState } from "react";
import Answers from "./Answers";

export default function Questions(props) {
  const { correctAns, incorrectAns, checked, addScore, questionCheck } = props;
  const decodedQ = decode(props.q);
  const [allAnswers, setAllAnswers] = useState(
    shuffleArray([...incorrectAns, correctAns])
  );
  const [choices, setChoices] = React.useState(getChoices);

  /* Randomize array in-place using Durstenfeld shuffle algorithm */
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function getChoices() {
    const choicesArray = [];
    allAnswers.map((answer) => {
      choicesArray.push({
        choice: answer,
        clicked: false,
        checked: false,
      });
    });

    return choicesArray;
  }

  const questionChoices = choices.map((x) => {
    return (
      <Answers
        className="question--answer"
        handleClick={(e) => handleClick(e)}
        answer={decode(x.choice)}
        clicked={x.clicked}
        check={checked}
        correct={correctAns}
        addScore={addScore}
      />
    );
  });

  function handleClick(e) {
    const choiceName = e.target.textContent;
    setChoices((prevChoices) =>
      prevChoices.map((item) => {
        questionCheck();
        return item.choice === choiceName
          ? { ...item, clicked: true }
          : { ...item, clicked: false };
      })
    );
  }

  function checkAns() {
    const userAns = choices.find((choice) => choice.clicked);
    if (userAns.choice === correctAns) {
      addScore();
    }
  }

  useEffect(() => {
    if (checked) {
      checkAns();
    }
  }, [checked]);

  return (
    <section className="question--container">
      <p className="question--question">{decodedQ}</p>
      <div className="question--answer-container">{questionChoices}</div>
    </section>
  );
}
