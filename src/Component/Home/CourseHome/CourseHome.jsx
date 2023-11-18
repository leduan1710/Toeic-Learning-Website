import React from "react";
import { useState, useEffect } from "react";
import Heading from "../../Common/Header/Heading";
import "./CourseHome.css";

function CourseHome({subtitle,title}) {
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
    <div className="lr-card-wrapper">
      <section>
        <div className="container lr-card">
          <Heading subtitle={subtitle} title={title} />
          <div className="card-wrapper-container">
            <div className="card-wrapper">
              {courses.map((course) => {
                return (
                  <div key={course.id} className="card">
                    <div className="image">
                      <img
                        src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-online-course-university-flaticons-flat-flat-icons-3.png"
                        alt=""
                      />
                    </div>
                    <h2>{course.name}</h2>
                    <p>{course.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CourseHome;
