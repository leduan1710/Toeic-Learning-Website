import React from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import "./VocabularyTopic.css";
import Heading from "../Common/Header/Heading";
import { useState, useEffect } from "react";

function VocabularyTopic() {
  const [topics, setTopic] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/vocabulary-topic")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTopic(data);
      });
  }, []);

  return (
    <div className="vocabulary-topic-wrapper">
      <div className="container vocabulary-topic">
        <Heading subtitle="VictoryU" title="Các Topic từ vựng thường gặp trong TOEIC" />
        <div className="vocabulary-topic-grid-wrapper">
          <div className="vocabulary-topic-gridview">
            {topics.map((val) => {
              return (
                <Link to={`/vocabulary-by-topic/${val.id}`}>
                  <div
                    key={val.vocabularyTopicID}
                    className="vocabulary-topic-item"
                  >
                    <img
                      src="https://img.icons8.com/ios/50/dictionary.png"
                      alt=""
                    />
                    <div className="vocabulary-topic-title">
                      {val.topicName}
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

export default VocabularyTopic;
