import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Heading from "../../Common/Header/Heading";
import "./CourseHome.css";
import Loader from "../../Common/Loader/Loader";

function CourseHome({ subtitle, title }) {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch("http://localhost:3000/courses");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCourses(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchCourses();
  }, []);
if(isLoading) {
  return <Loader/>
}
  return (
    <div className="lr-card-wrapper">
      <section>
        <div className="lr-card">
          <Heading subtitle={subtitle} title={title} />
          <div className="card-wrapper-container">
            <div className="card-wrapper">
              {courses && courses.length > 0 ? (
                courses.map((course, index) => {
                  return (
                    <div key={index} className="card">
                      <Link to={`/course-lessons/${course.id}`}>
                        <div className="card-content">
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
                })
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CourseHome;
