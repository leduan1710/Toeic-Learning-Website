import React from "react";
import { Link } from "react-router-dom";
import Loader from "../Common/Loader/Loader";
import Heading from "../Common/Header/Heading";
import { useState, useEffect } from "react";
import "./TestList.css";

function TestList({ testType }) {
  const [tests, setTest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/tests/${testType}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const { test: testList } = data;
        setTest(testList);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [testType]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="test-wrapper">
      <div className="container test-list">
        <Heading
          subtitle="VictoryU"
          title={`${
            testType === "miniTest"
              ? "Kiểm tra mini test TOEIC"
              : testType === "fullTest"
              ? "Kiểm tra full test TOEIC"
              : "Kiểm tra giả lập TOEIC"
          }`}
        />
        <div className="test-grid-wrapper">
          <div className="test-grid">
            {tests.map((test, index) => {
              return (
                <Link to={`/test/${test.id}`}>
                  <div key={index} className="test-item">
                    <img
                      src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/100/external-online-test-online-education-flaticons-lineal-color-flat-icons-2.png"
                      alt=""
                    />
                    <div className="test-title">{test.title}</div>
                    <div className="test-info">
                      <div>
                        <div className="test-info-title">Thời gian</div>
                        <div className="test-info-item">{`${
                          testType === "miniTest" ? "60 phút" : "120 phút"
                        }`}</div>
                      </div>
                      <div>
                        <div className="test-info-title">Số câu hỏi</div>
                        <div className="test-info-item">
                          {testType === "miniTest" ? "100 câu" : "200 câu"}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestList;
