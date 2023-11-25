import React from "react";
import { Link } from "react-router-dom";
import Loader from "../Common/Loader/Loader";
import "./VocabularyTopic.css";
import Heading from "../Common/Header/Heading";
import { useState, useEffect } from "react";

function VocabularyTopic() {
  const [topics, setTopic] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchVocabularyTopic() {
      try {
        const response = await fetch("http://localhost:3000/vocabulary-topic");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTopic(data);
        setIsLoading(false);
      } catch (error) {}
    }
    fetchVocabularyTopic();
    window.scrollTo(0, 0);
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="vocabulary-topic-wrapper">
      <div className="container vocabulary-topic">
        <Heading
          subtitle="VictoryU"
          title="Các Topic từ vựng thường gặp trong TOEIC"
        />
        <div className="vocabulary-topic-grid-wrapper">
          <div className="vocabulary-topic-gridview">
            {topics && topics.map((val) => {
              return (
                <Link to={`/vocabulary-by-topic/${val.id}`}>
                  <div
                    key={val.vocabularyTopicID}
                    className="vocabulary-topic-item"
                  >
                    <img
                      src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-vocabulary-literature-flaticons-lineal-color-flat-icons-2.png"
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
