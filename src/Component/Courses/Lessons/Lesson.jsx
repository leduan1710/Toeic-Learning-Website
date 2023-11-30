/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";
import Heading from "../../Common/Header/Heading";
import "./Lesson.css";
import Quiz from "../Lessons/Quiz/Quiz";
import Loader from "../../Common/Loader/Loader";
import { UserContext } from "../../../Context/UserContext";

function Lesson() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [other_lessons, setOtherLesson] = useState([]);
  const [current_lesson, setCurrentLesson] = useState({});
  const [quizes, setQuizes] = useState([]);
  const [current_quizID, setCurrentQuizID] = useState(1);
  const [quizData, setQuizData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLessons() {
      try {
        const response = await fetch(`http://localhost:3000/lessons/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCurrentLesson(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchLessons();
    window.scrollTo(0, 0);
  }, [id]);
  useEffect(() => {
    async function fetchOtherLessons() {
      try {
        const courseid = current_lesson.courseid;
        if (courseid) {
          const response = await fetch(
            `http://localhost:3000/course-lessons/${courseid}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          const { lessons: lessonList } = data;
          setOtherLesson(lessonList.filter((lesson) => lesson.id != id));
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    async function fetchQuizes() {
      try {
        const response = await fetch(
          `http://localhost:3000/quizes-by-lesson/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const { quizes: quizList } = data;
        setQuizes(quizList);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchOtherLessons();
    fetchQuizes();
  }, [current_lesson]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/questions-by-quiz/${current_quizID}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const { questions: questionList } = data;
        setQuizData(questionList);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchQuiz();
  }, [current_quizID]);

  if (isLoading) {
    return <Loader />;
  }
  if(!user.auth){
    navigate("/login")
  }
  
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
            {other_lessons &&
              other_lessons.map((lesson, index) => {
                return (
                  <Link key={index} to={`/lesson/${lesson.id}`}>
                    <div className="other-lessons-item">
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
            {quizes &&
              quizes.map((quiz, index) => {
                return (
                  <input
                    className="lesson-quiz-item"
                    key={index}
                    type="button"
                    value={quiz.title}
                    onClick={() => {
                      setCurrentQuizID(quiz.id);
                    }}
                  />
                );
              })}
            {quizes &&
              quizes.map((quiz, index) => {
                return (
                  <input
                    className="lesson-quiz-item"
                    key={index}
                    type="button"
                    value={quiz.title}
                    onClick={() => {
                      setCurrentQuizID(quiz.id);
                    }}
                  />
                );
              })}
          </div>
        </div>
        <div className="lesson-right-row">
          <div className="lesson-content-wrapper">
            <div className="lesson-title-wrapper">
              <div className="lesson-title">{current_lesson.title}</div>
              <hr />
            </div>
            <div className="lesson-content">
              <Markdown>{current_lesson.content}</Markdown>
              <Markdown>{current_lesson.content}</Markdown>
              <Markdown>{current_lesson.content}</Markdown>
              <Markdown>{current_lesson.content}</Markdown>
              <Markdown>{current_lesson.content}</Markdown>
            </div>
          </div>
          <div className="lesson-quiz-main">
            {quizData && quizData.length <= 0 ? (
              ""
            ) : (
              <Quiz
                quizData={quizData}
                quizTitle={quizes[current_quizID - 1] && quizes[current_quizID - 1].title}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lesson;
