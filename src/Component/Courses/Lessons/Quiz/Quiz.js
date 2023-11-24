import React, { useState, useEffect } from "react";
import QuizResult from "./QuizResult";
import "./Quiz.css";
import Loader from "../../../Common/Loader/Loader";
import QuizStart from "./QuizStart";

function Quiz({ quizData, quizTitle }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [clickedOption, setClickedOption] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const [clickedList, setclickedList] = useState(
    Array.from({ length: quizData.length }, () => 0)
  );

  useEffect(() => {
    if (!showResult) {
      setclickedList(
        clickedList.map((clickedItem, index) =>
          currentQuestion === index ? clickedOption : clickedItem
        )
      );
    }
  }, [clickedOption]);

  useEffect(() => {
    if (showResult) {
      const result = {
        total: currentQuestion + 1,
        score: score,
      };
      localStorage.setItem(
        `quizResult${quizData[0].quizid}`,
        JSON.stringify(result)
      );
    }
  }, [showResult]);

  const nextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setClickedOption(0);
    } else {
      updateScore();
      setShowResult(true);
    }
  };
  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setClickedOption(0);
    }
  };

  const updateScore = () => {
    let score = 0;
    for (let i = 0; i < clickedList.length && i < quizData.length; i++) {
      if (clickedList[i] == quizData[i].answer) {
        score += 1;
      }
    }
    setScore(score);
  };

  const resetAll = () => {
    setShowResult(false);
    setCurrentQuestion(0);
    setClickedOption(0);
    setScore(0);
    setclickedList(Array.from({ length: quizData.length }, () => 0));
    localStorage.removeItem("quizResult");
  };

  if (quizData.length <= 0) {
    return <Loader />;
  }
  if (localStorage.getItem(`quizResult${quizData[0].quizid}`)) {
    const quizResult = JSON.parse(
      localStorage.getItem(`quizResult${quizData[0].quizid}`)
    );

    return (
      <QuizStart
        total={quizResult.total}
        score={quizResult.score}
        resetAll={resetAll}
      />
    );
  }
  return (
    <div className="quiz-wrapper">
      <p className="heading-txt">{quizTitle}</p>
      <div className="container">
        {showResult ? (
          <QuizResult
            score={score}
            totalScore={quizData.length}
            tryAgain={resetAll}
          ></QuizResult>
        ) : (
          <div className="quiz-main">
            <div className="question">
              <span className="question-number">{currentQuestion + 1}. </span>
              <span className="question-txt">
                {quizData[currentQuestion].content}
              </span>
            </div>
            <div className="option-container">
              {quizData[currentQuestion].choices.map((option, i) => {
                if (clickedList[currentQuestion] != 0) {
                  return (
                    <button
                      className={`option-btn ${
                        clickedList[currentQuestion] === i + 1 &&
                        quizData[currentQuestion].answer != i + 1
                          ? "wrong-option"
                          : null
                      } ${
                        quizData[currentQuestion].answer == i + 1
                          ? "correct-option"
                          : null
                      }`}
                    >
                      {option}
                    </button>
                  );
                }
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
                clickedOption == 0 && clickedList[currentQuestion] == 0
                  ? "question-explaination-hide"
                  : null
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
