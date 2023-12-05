/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Heading from "../../Common/Header/Heading";
import "./Lesson.css";
import Quiz from "../Lessons/Quiz/Quiz";
import Loader from "../../Common/Loader/Loader";
import { UserContext } from "../../../Context/UserContext";
import { toast } from "react-toastify";
import HTMLReactParser from "html-react-parser";

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

  async function fetchLessons() {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://localhost:7112/api/Lesson/GetLessonById/${id}`
      );
      setIsLoading(false);
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`${errorData.message}`, {
          position: toast.POSITION.BOTTOM_RIGHT, // Vị trí hiển thị
          autoClose: 5000, // Tự động đóng sau 3 giây
          closeOnClick: true, // Đóng khi click
          pauseOnHover: true, // Tạm dừng khi di chuột qua
          draggable: true, // Có thể kéo thông báo
        });
      }
      const data = await response.json();
      setCurrentLesson(data);
    } catch (error) {
      toast.error(`${error}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }

  async function fetchOtherLessons() {
    try {
      setIsLoading(true);
      const courseid = current_lesson.idCourse;
      if (courseid) {
        const response = await fetch(
          `https://localhost:7112/api/Lesson/GetAllLessonByCourse/${courseid}`
        );
        if (!response.ok) {
          const errorData = await response.json();
          toast.error(`${errorData.message}`, {
            position: toast.POSITION.BOTTOM_RIGHT, // Vị trí hiển thị
            autoClose: 5000, // Tự động đóng sau 3 giây
            closeOnClick: true, // Đóng khi click
            pauseOnHover: true, // Tạm dừng khi di chuột qua
            draggable: true, // Có thể kéo thông báo
          });
        }
        const data = await response.json();
        setOtherLesson(data.filter((lesson) => lesson.idLesson !== id));
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(`${error}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }

  async function fetchQuizes() {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://localhost:7112/api/Quiz/GetAllQuizByLesson/${id}`
      );
      setIsLoading(false);
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`${errorData.message}`, {
          position: toast.POSITION.BOTTOM_RIGHT, // Vị trí hiển thị
          autoClose: 5000, // Tự động đóng sau 3 giây
          closeOnClick: true, // Đóng khi click
          pauseOnHover: true, // Tạm dừng khi di chuột qua
          draggable: true, // Có thể kéo thông báo
        });
      }
      const data = await response.json();
      setQuizes(data);
    } catch (error) {
      toast.error(`${error}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }
  
  const fetchQuiz = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:3000/questions-by-quiz/${current_quizID}`
      );
      setIsLoading(false);
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`${errorData.message}`, {
          position: toast.POSITION.BOTTOM_RIGHT, // Vị trí hiển thị
          autoClose: 5000, // Tự động đóng sau 3 giây
          closeOnClick: true, // Đóng khi click
          pauseOnHover: true, // Tạm dừng khi di chuột qua
          draggable: true, // Có thể kéo thông báo
        });
      }
      const data = await response.json();
      const { questions: questionList } = data;
      setQuizData(questionList);
    } catch (error) {
      toast.error(`${error}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  useEffect(() => {
    fetchLessons();
    window.scrollTo(0, 0);
  }, [id]);
  useEffect(() => {
    fetchOtherLessons();
    fetchQuizes();
  }, [current_lesson]);

  useEffect(() => {
    fetchQuiz();
  }, [current_quizID]);

  if (!user.auth) {
    navigate("/login");
  }

  if (isLoading) {
    return <Loader />;
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
                  <Link key={index} to={`/lesson/${lesson.idLesson}`}>
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
              {HTMLReactParser(String(current_lesson.content))}
            </div>
          </div>
          <div className="lesson-quiz-main">
            {quizData && quizData.length <= 0 ? (
              ""
            ) : (
              <Quiz
                quizData={quizData}
                quizTitle={
                  quizes[current_quizID - 1] && quizes[current_quizID - 1].title
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lesson;
