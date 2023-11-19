/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";
import Heading from "../../Common/Header/Heading";
import "./Lesson.css";
import Quiz from "./Quiz";

function Lesson() {
  const { id } = useParams();
  const [current_lesson, setCurrentLesson] = useState({});
  const [other_lessons, setOtherLesson] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/lessons/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCurrentLesson(data);
      });
    window.scrollTo(0, 0);
  }, [id]);
  useEffect(() => {
    const courseid = current_lesson.courseid;
    if (courseid) {
      fetch(`http://localhost:3000/course-lessons/${courseid}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const { lessons: lessonList } = data;
          setOtherLesson(lessonList.filter((lesson) => lesson.id != id));
        });
    }
  }, [current_lesson]);

  return (
    <div className="lesson-wrapper">
      <Heading subtitle="VictoryU" title="TOEIC BASIC" />
      <div className="lesson-main">
        <div className="lesson-left-row">
          <div className="lesson-left-row-title">Các bài học khác</div>
          <div className="dividing-line">
            <hr />
          </div>
          <div className="other-lessons">
            {other_lessons.map((lesson, index) => {
              return (
                <Link to={`/lesson/${lesson.id}`}>
                  <div key={index} className="other-lessons-item">
                    <div className="other-lesson-title">{lesson.title}</div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="dividing-line">
            <hr />
          </div>
          <div className="lesson-quiz-list">
            <div className="lesson-quiz-item">QUIZ 1</div>
            <div className="lesson-quiz-item">QUIZ 2</div>
            <div className="lesson-quiz-item">QUIZ 3</div>
            <div className="lesson-quiz-item">QUIZ 4</div>
            <div className="lesson-quiz-item">QUIZ 5</div>
            <div className="lesson-quiz-item">QUIZ 6</div>
            <div className="lesson-quiz-item">QUIZ 7</div>
            <div className="lesson-quiz-item">QUIZ 8</div>
            <div className="lesson-quiz-item">QUIZ 9</div>
            <div className="lesson-quiz-item">QUIZ 10</div>
          </div>
        </div>
        <div className="lesson-right-row">
          <div className="lesson-content-wrapper">
            <div className="lesson-title">{current_lesson.title}</div>
            <div className="lesson-content">
              <Markdown>{current_lesson.content}</Markdown>
            </div>
          </div>
          <div className="lesson-quiz-main">
            <Quiz/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lesson;
