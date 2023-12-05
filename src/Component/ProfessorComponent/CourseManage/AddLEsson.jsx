import React, { useContext, useState } from "react";
import "./AddLesson.css";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserContext } from "../../../Context/UserContext";
import { toast } from "react-toastify";
import Loader from "../../Common/Loader/Loader";

function AddLesson() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [current_course, setCurrentCourse] = useState([]);

  const { user } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);

  const {
    register: course,
    handleSubmit,
    formState: { errors },
  } = useForm();
  async function fetchLessons() {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://localhost:7112/api/Lesson/GetAllLessonByCourse/${id}`
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
      setCurrentCourse(data);
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
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="add-lesson-wrapper">
      <div className="professor-board-header">
        <div className="professor-managment-title">
          <h3 style={{ marginLeft: "1rem" }}>
            {id ? "CHỈNH SỬA BÀI HỌC" : "THÊM BÀI HỌC MỚI"}
          </h3>
        </div>
        <img
          onClick={() => navigate("/professor/course")}
          width="50"
          height="50"
          src="https://img.icons8.com/ios-filled/50/2d9358/reply-arrow.png"
          alt="reply-arrow"
        />
      </div>
      <div className="add-lesson-form-wrapper">
        <form>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ width: "50%" }} className="input-field">
              <input></input>
            </div>
          </div>
          <div style={{ height: "6rem" }} className="input-field">
            <textarea></textarea>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddLesson;
