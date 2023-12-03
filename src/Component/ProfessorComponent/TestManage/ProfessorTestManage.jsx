import React, { useEffect, useState } from "react";
import "./ProfessorTestManage.css";
import { toast } from "react-toastify";
import Loader from "../../Common/Loader/Loader";
import Heading from "../../Common/Header/Heading";
import { Link } from "react-router-dom";

function ProfessorTestManage() {
  const [tests, setTest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const testType = "miniTest";

  useEffect(() => {
    async function fetchTests() {
      try {
        const response = await fetch(
          `http://localhost:3000/tests/${"miniTest"}`
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
        const { test: testList } = data;
        setTest(testList);
        setIsLoading(false);
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
    fetchTests();
    window.scrollTo(0, 0);
  }, [testType]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="professor-test-wrapper">
      <div className="professor-managment-title">
        <h3>TEST MANAGEMENT</h3>
      </div>
      <div className="test-grid-wrapper">
        <div className="test-grid">
          <Link to="professor/test/addTest">
            <div className="test-item">
              <img
                width="180"
                height="180"
                src="https://img.icons8.com/nolan/100/add.png"
                alt="add"
              />
            </div>
          </Link>
          {tests.map((test, index) => {
            return (
              <Link to={`/test/${test.id}`}>
                <div key={index} className="test-item">
                  <img
                    src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/100/external-online-test-online-education-flaticons-lineal-color-flat-icons-2.png"
                    alt=""
                  />
                  <div className="test-title">{test.title}</div>
                  <button className="btn">Delete</button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProfessorTestManage;
