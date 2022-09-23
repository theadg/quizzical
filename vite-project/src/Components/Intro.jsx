import React from "react";

export default function Intro(props) {
  return (
    <div className="intro--wrapper">
      <div className="intro--text-group">
        <h1>Quizzical</h1>
        <h4>Some description if needed</h4>
      </div>
      <button className="intro--start-button" onClick={props.onClick}>
        Start Quiz
      </button>
    </div>
  );
}
