import React from "react";
import "./TestResult.css";
import { Link } from "react-router-dom";

function TestResult(props) {
  return (
    <div className="test-result">
      <div className="congratulation">
        Congratulation
        <img
          width="150"
          height="150"
          src="https://img.icons8.com/clouds/100/confetti.png"
          alt="confetti"
        />
      </div>
      <div className="show-score">
        <div className="test-result-infor">
          <div>Score</div>
          <hr />
          {props.score}
        </div>
        <div className="test-result-infor">
          <div>Total</div>
          <hr />
          {props.totalScore}
        </div>
        <div className="test-result-infor">
          <div>Percent</div>
          <hr />
          {props.score / props.total}
        </div>
      </div>
      <button className="test-backtohome" onClick={props.tryAgain}>
        <Link to="/test">Quay về trang đề thi</Link>
      </button>
    </div>
  );
}

export default TestResult;
