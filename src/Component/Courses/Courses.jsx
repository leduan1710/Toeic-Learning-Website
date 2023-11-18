import React from "react";
import { useState, useEffect } from "react";
import Heading from "../Common/Header/Heading";
import TestHome from "../Home/TestHome/TestHome"
import { Link } from "react-router-dom";
import "./Courses.css";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/courses")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCourses(data);
      });
  }, []);

  return (
    <div className="courses-list-wrapper">
      <div className="container courses-list">
        <Heading subtitle="VictoryU" title="Các khóa học của VictoryU" />
        <div className="courses-list-grid-wrapper">
          <div className="courses-list-gridview">
            {courses.map((course) => {
              return (
                <div key={course.id} className="courses-list-item">
                  <Link to={`/course-lessons/${course.id}`}>
                    <div className="course-item">
                      <div className="image">
                        <img
                          src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-online-course-university-flaticons-flat-flat-icons-3.png"
                          alt=""
                        />
                      </div>
                      <h2>{course.name}</h2>
                      <p>{course.description}</p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <TestHome subtitle="" title="Thực hiện các bài thi TOEIC"/>
      </div>
    </div>
  );
}

export default Courses;
