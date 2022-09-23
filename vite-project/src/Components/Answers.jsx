import React, { useState } from "react";

export default function Answers(props) {
  const { handleClick, clicked, check, correct, answer, addScore} = props;
 

  //styling for click
  const styles = {
    backgroundColor: clicked ? "#D6DBF5" : "",
    color: clicked ? "#293264" : "",
  };
  //styling for checking ans
  const checkAnswer = correct === answer;
React.useEffect(()=>{
  if (checkAnswer && clicked || checkAnswer){
    addScore
    console.log(`${answer} TAMA SAGOT`)
  } else if (check){
    console.log(`${answer} MALI`);
  }
}, [check])
// styling for checked answers
  const checkStyles = {
    //color
    backgroundColor:
      checkAnswer && clicked
        ? "#94D7A2"
        : checkAnswer && !clicked
        ? "#94D7A2"
        : clicked && !checkAnswer
        ? "#F8BCBC"
        : "",
    opacity:
      checkAnswer && clicked
        ? 1
        : checkAnswer && !clicked
        ? 1
        : clicked && !checkAnswer
        ? 0.7
        : 0.7,
  };

  return (
    <>
      <button
        className="question--answer"
        style={check ? checkStyles : styles}
        onClick={handleClick}
      >
        {props.answer}
      </button>
    </>
  );
}
