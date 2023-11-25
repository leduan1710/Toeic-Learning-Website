import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import "./VocabularyByTopic.css";
import Heading from "../Common/Header/Heading";
import Loader from "../Common/Loader/Loader";

function VocabularyByTopic() {
  const [words, setWords] = useState([]);
  const [topicName, setTopicName] = useState("");
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchVocabulary() {
      try {
        const response = await fetch(`http://localhost:3000/vocabulary/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const { word: wordList } = data;
        setWords(wordList);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    async function fetchVocabularyTopic() {
      try {
        const response = await fetch(
          `http://localhost:3000/vocabulary-topic/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTopicName(data.topicName);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchVocabulary();
    fetchVocabularyTopic();
    window.scrollTo(0, 0);
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = words.length;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  useEffect(() => {
    setCurrentSlide(0);
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="vocabulary-wrapper">
      <div className="container vocabulary-card">
        <Heading subtitle="VictoryU" title={`Từ vựng chủ đề ${topicName}`} />
        <div className="slider">
          <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
          <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />
          {words &&
            words.map((word, index) => {
              return (
                <div
                  key={index}
                  className={index === currentSlide ? "slide current" : "slide"}
                >
                  <label>
                    <input type="checkbox" />
                    <div className="flip-card">
                      <div className="front">
                        <div className="eng-word">{word.engWord}</div>
                        <div>
                          <hr />
                          <p className="flip">Click to flip</p>
                        </div>
                      </div>
                      <div className="back">
                        <div className="word-type">{word.wordType}</div>
                        <hr />
                        <div className="meaning">{word.meaning}</div>
                        <hr />
                        <p className="flip">Click to flip</p>
                      </div>
                    </div>
                  </label>
                </div>
              );
            })}
        </div>
        <div className="vocabulary-list-wrapper">
          <div className="vocabulary-list">
            <table>
              <thead>
                <tr>
                  <td className="col1">Từ vựng </td>
                  <td className="col2">Từ loại</td>
                  <td className="col3">Nghĩa</td>
                </tr>
              </thead>
              <tbody>
                {words &&
                  words.map((word, key) => {
                    return (
                      <tr>
                        <td className="col1">{word.engWord}</td>
                        <td className="col2">{word.wordType}</td>
                        <td className="col3">{word.meaning}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VocabularyByTopic;
