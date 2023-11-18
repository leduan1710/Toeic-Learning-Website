import React from "react";
import "./CourseLessons.css";
import Heading from "../Common/Header/Heading";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function CourseLessons() {
  const [lessons, setLessons] = useState([]);
  const [courses, setCourses] = useState([]);
  const { id } = useParams();
  const [current_course, setCurrentCourse] = useState({});
  const [other_courses, setOtherCourses] = useState([]);

  useEffect(() => {
    console.log("render");
    fetch(`http://localhost:3000/course-lesson/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const { lessons: lessonList } = data;
        setLessons(lessonList);
      });

    fetch(`http://localhost:3000/courses`)
      .then((res) => {
        return res.json();
      })
      .then((course_list) => {
        setCourses(course_list);
        setCurrentCourse(course_list.find((course) => course.id == id));
        setOtherCourses(course_list.filter((course) => course.id != id));
      });
  }, [id]);

  return (
    <div>
      <div className="course-lesson-wrapper">
        <div className="container course-lesson-card">
          <Heading subtitle={current_course.name} />
          <div className="list-lesson-wrapper">
            <div className="list-lesson">
              {lessons.map((lesson, index) => {
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
                {other_courses.map((other_course, index) => {
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
