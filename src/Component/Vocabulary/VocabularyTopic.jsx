import React from "react";
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
        <Heading subtitle="VictoryU" title="Tự học TOEIC theo từng Part" />
        <div className="vocabulary-topic-grid-wrapper">
          <div className="vocabulary-topic-gridview">
            {topics.map((val) => {
              return (
                <div key={val.vocabularyTopicID} className="vocabulary-topic-item">
                  <img
                    src="https://img.icons8.com/ios/50/dictionary.png"
                    alt=""
                  />
                  <div className="vocabulary-topic-title">
                    {val.topicName}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VocabularyTopic;
