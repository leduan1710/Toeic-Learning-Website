import React, { useState, useEffect } from "react";
import "./TestMain.css";
import Loader from "../../Common/Loader/Loader.jsx";

const parts = [
  {
    id: 1,
    title: "Phần 1",
  },
  {
    id: 2,
    title: "Phần 2",
  },
  {
    id: 3,
    title: "Phần 3",
  },
  {
    id: 4,
    title: "Phần 4",
  },
  {
    id: 5,
    title: "Phần 5",
  },
  {
    id: 6,
    title: "Phần 6",
  },
  {
    id: 7,
    title: "Phần 7",
  },
];

function TestMain() {
  const [current_part, setCurrentPart] = useState(1);
  const [testdata, setTestdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let question_num = 0;

  useEffect(() => {
    fetch("http://localhost:3000/test-by-id")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTestdata(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, []);

  function nextPart() {
    if (current_part < 7) {
      setCurrentPart(current_part + 1);
    }
  }
  function previousPart() {
    if (current_part > 1) {
      setCurrentPart(current_part - 1);
    }
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="tab-container">
      <div className="tab-header">
        {parts.map((part) => {
          return (
            <div
              key={part.id}
              className={`tab-item ${
                current_part === part.id ? "tab-index-active" : null
              }`}
              onClick={() => setCurrentPart(part.id)}
            >
              {part.title}
            </div>
          );
        })}
      </div>
      <div className="tab-content">
        {testdata.map((testpart, index) => {
          return (
            <div
              key={index}
              className={
                current_part === testpart.partNum
                  ? "tab-pane-active"
                  : "tab-pane"
              }
            >
              {testpart.units.map((unit, index) => {
                return (
                  <div key={index} className="test-unit-wrapper">
                    {unit.paragraph !== "" || unit.image !== "" ? (
                      <div className="test-unit-left">
                        <div className="test-img">
                          <img src={unit.image} alt={unit.image} />
                        </div>
                        <div className="test-paragraph">
                          <p>{unit.paragraph}</p>
                          <p>{unit.paragraph}</p>
                          <p>{unit.paragraph}</p>
                          <p>{unit.paragraph}</p>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="test-unit-right">
                      <div className="test-unit-audio">
                        {unit.audio && (
                          <audio src={unit.audio} controls></audio>
                        )}
                      </div>
                      {unit.question.map((question_item, index) => {
                        question_num++;
                        return (
                          <div key={index} className="test-question">
                            <div className="test-question-content">
                              <div className="test-question-number">
                                {question_num}
                              </div>
                              {question_item.content}
                            </div>
                            <div className="test-choice-wrapper">
                              {question_item.choices.map((choice, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="test-choice-option"
                                  >
                                    {index === 0
                                      ? "(A). "
                                      : index === 1
                                      ? "(B). "
                                      : index === 2
                                      ? "(C). "
                                      : "(D). "}
                                    {choice}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
        <div className="quiz-button">
          <input
            type="button"
            value="Previous"
            className="previous-button"
            onClick={previousPart}
          />
          <input
            type="button"
            value={current_part === 7 ? "Done" : "Next"}
            className="next-button"
            onClick={nextPart}
          />
        </div>
      </div>
    </div>
  );
}

export default TestMain;
