import React, { useEffect, useState } from "react";
import "./QuizManage.css";
import Loader from "../../../../Common/Loader/Loader";
import { toast } from "react-toastify";

function QuizManage({ idLesson }) {
  console.log(idLesson);
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [quizes, setQuizes] = useState([]);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  async function fetchLessons() {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://localhost:7112/api/Quiz/GetAllQuizByLesson/${idLesson}`
      );
      setIsLoading(false);
      if (!response.ok) {
        const errorData = await response.json();
        console.log(response);
        toast.error(`${errorData.message}`, {
          position: toast.POSITION.BOTTOM_RIGHT, // Vị trí hiển thị
          autoClose: 5000, // Tự động đóng sau 3 giây
          closeOnClick: true, // Đóng khi click
          pauseOnHover: true, // Tạm dừng khi di chuột qua
          draggable: true, // Có thể kéo thông báo
        });
      } else {
        const data = await response.json();
        setQuizes(data);
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
  useEffect(() => {
    fetchLessons();
  }, [idLesson]);
  useEffect(() => {
    fetchLessons();
  }, []);

  if (isLoading) {
    <Loader />;
  }

  return (
    <div className="professor-quiz-wrapper">
      <div className="professor-board-header">
        <div className="professor-managment-title">
          <h3 style={{ marginLeft: "1rem" }}>QUẢN LÝ QUIZ</h3>
        </div>
        <div className="professor-add-button" onClick={toggleModal}>
          <img
            width="34"
            height="34"
            src="https://img.icons8.com/doodle/48/add.png"
            alt="add"
          />
          <h3>THÊM KHÓA HỌC MỚI</h3>
        </div>
      </div>
      <div className="professor-quiz-list">
        <div className="professor-quiz-item"></div>
      </div>
    </div>
  );
}

export default QuizManage;
