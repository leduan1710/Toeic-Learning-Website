import React from "react";
import "./CourseLessons.css";
import Heading from "../Common/Header/Heading";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Loader from "../Common/Loader/Loader";

function CourseLessons() {
  const [lessons, setLessons] = useState([]);
  const { id } = useParams();
  const [current_course, setCurrentCourse] = useState({});
  const [other_courses, setOtherCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLessons() {
      try {
        const response = await fetch(
          `http://localhost:3000/course-lessons/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const { lessons: lessonList } = data;
        setLessons(lessonList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    async function fetchOtherLessons() {
      try {
        const response = await fetch("http://localhost:3000/courses");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCurrentCourse(data.find((course) => course.id == id));
        setOtherCourses(data.filter((course) => course.id != id));
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchLessons();
    fetchOtherLessons()
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="course-lesson-wrapper">
        <div className="container course-lesson-card">
          <Heading subtitle={current_course.name} />
          <div className="list-lesson-wrapper">
            <div className="list-lesson">
              {lessons &&
                lessons.map((lesson, index) => {
                  return (
                    <div key={index} className="list-lesson-item">
                      <Link to={`/lesson/${lesson.id}`}>
                        <div className="list-lesson-name">{lesson.title}</div>
                      </Link>
                    </div>
                  );
                })}
            </div>
            <div className="other-course-wrapper">
              <div className="title">Các khóa học khác</div>
              <div className="other-course-list">
                {other_courses &&
                  other_courses.map((other_course, index) => {
                    return (
                      <div key={index} className="course-item">
                        <Link to={`/course-lessons/${other_course.id}`}>
                          {other_course.name}
                        </Link>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseLessons;
