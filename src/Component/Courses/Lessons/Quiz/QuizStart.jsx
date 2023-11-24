import React from "react";
import "./Quiz.css"

function QuizStart({ score, total, resetAll }) {
  return (
    <>
      <div>
        {score} / {total}
      </div>
      <input type="button" value={"Retry"} onClick={resetAll} />
    </>
  );
}

export default QuizStart;
