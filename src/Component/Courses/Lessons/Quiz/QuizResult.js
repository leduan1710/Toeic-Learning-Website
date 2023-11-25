import React from "react";

function QuizResult(props) {
  return (
    <div className="quiz-result">
      <div className="show-score">
        <div className="quiz-score">Your Score:{props.score}</div>
        <div className="quiz-total">Total Score:{props.totalScore}</div>
      </div>
      <button className="quiz-try-again" onClick={props.tryAgain}>
        Try Again
      </button>
    </div>
  );
}

export default QuizResult;
