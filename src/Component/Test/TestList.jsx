import React from "react";
import { Link } from "react-router-dom";
import Loader from "../Common/Loader/Loader";
import Heading from "../Common/Header/Heading";
import { useState, useEffect } from "react";
import "./TestList.css";

function TestList({ testType }) {
  const [tests, setTest] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/vocabulary-topic")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTest(data);
      });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="test-wrapper">
      <div className="container test-list">
        <Heading subtitle="VictoryU" title={`${testType==="miniTest" ? "Kiểm tra mini test TOEIC" : (testType==="fullTest" ? "Kiểm tra full test TOEIC" : "Kiểm tra giả lập TOEIC")}`} />
        <div className="test-grid-wrapper">
          <div className="test-grid">
            {tests.length > 0 ? (
              tests.map((val) => {
                return (
                  <Link to={`/vocabulary-by-topic/${val.id}`}>
                    <div key={val.vocabularyTopicID} className="test-item">
                      <img
                        src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/100/external-online-test-online-education-flaticons-lineal-color-flat-icons-2.png"
                        alt=""
                      />
                      <div className="test-title">{val.topicName}</div>
                      <div className="test-infor">
                        <div className="test-info-time">120 phút</div>
                        <div className="test-info-question-number">200 câu hỏi</div>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestList;
