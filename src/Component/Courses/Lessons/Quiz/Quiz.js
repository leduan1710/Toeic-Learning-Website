import React, { useState, useEffect } from "react";
import QuizResult from "./QuizResult";
import "./Quiz.css";
import Loader from "../../../Common/Loader/Loader";

function Quiz({ quizData, quizTitle }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [clickedOption, setClickedOption] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [clickedList, setclickedList] = useState(
    Array.from({ length: quizData.length }, () => 0)
  );

  useEffect(() => {
    if (showResult) {
      const result = {
        id: quizData[0].quizid,
        total: currentQuestion + 1,
        score: score,
      };
      localStorage.setItem("quizResult", JSON.stringify(result));
    }
  }, [showResult]);
  useEffect(() => {
    setclickedList(
      clickedList.map((clickedItem, index) =>
        currentQuestion === index ? clickedOption : clickedItem
      )
    );
  }, [clickedOption]);

  const nextQuestion = () => {
    updateScore();
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setClickedOption(0);
    } else {
      setShowResult(true);
    }
  };
  const previousQuestion = () => {
    if (
      clickedOption === quizData[currentQuestion].answer ||
      clickedOption === 0
    ) {
      setScore(score - 1);
    }
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setClickedOption(0);
    }
  };

  const updateScore = () => {
    if (clickedOption === quizData[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const resetAll = () => {
    setShowResult(false);
    setCurrentQuestion(0);
    setClickedOption(0);
    setScore(0);
  };

  if (quizData.length <= 0) {
    return <Loader />;
  }

  return (
    <div className="quiz-wrapper">
      <p className="heading-txt">{quizTitle}</p>
      <div className="quiz-content-container">
        {showResult ? (
          <QuizResult
            score={score}
            totalScore={quizData.length}
            tryAgain={resetAll}
          ></QuizResult>
        ) : (
          <div className="quiz-main">
            <div className="question">
              <span id="question-number">{currentQuestion + 1}. </span>
              <span id="question-txt">{quizData[currentQuestion].content}</span>
            </div>
            <div className="option-container">
              {quizData[currentQuestion].choices.map((option, i) => {
                return (
                  <button
                    className={`option-btn ${
                      clickedOption === i + 1 &&
                      quizData[currentQuestion].answer != i + 1
                        ? "wrong-option"
                        : null
                    } ${
                      quizData[currentQuestion].answer == i + 1 &&
                      clickedOption != 0
                        ? "correct-option"
                        : null
                    }`}
                    key={i}
                    onClick={() => setClickedOption(i + 1)}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            <div
              className={`question-explaination ${
                clickedOption == 0 ? "question-explaination-hide" : null
              }`}
            >
              {quizData[currentQuestion].explaination}
            </div>
            <div className="quiz-button">
              <input
                type="button"
                value="Previous"
                className="previous-button"
                onClick={previousQuestion}
              />
              <input
                type="button"
                value={currentQuestion == quizData.length - 1 ? "Done" : "Next"}
                className="next-button"
                onClick={nextQuestion}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;
