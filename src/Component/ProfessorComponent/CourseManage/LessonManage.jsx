import React, { useContext, useEffect, useState } from "react";
import "./LessonManage.css";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../../Context/UserContext";
import Loader from "../../Common/Loader/Loader";

function LessonManage() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [current_course, setCurrentCourse] = useState({});
  const [lessons, setLessons] = useState([]);

  const {
    register: course,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function fetchCurrentLesson() {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://localhost:7112/api/Course/GetCourseById/${id}`
      );
      if (!response.ok) {
        toast.error("Fetch Data failed", {
          position: toast.POSITION.BOTTOM_RIGHT, // Vị trí hiển thị
          autoClose: 5000, // Tự động đóng sau 3 giây
          closeOnClick: true, // Đóng khi click
          pauseOnHover: true, // Tạm dừng khi di chuột qua
          draggable: true, // Có thể kéo thông báo
        });
      }
      const data = await response.json();
      setCurrentCourse(data);
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
  async function UpdateCurrentLesson(course) {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://localhost:7112/api/Course/UpdateCourse/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idUser: user.idUser,
            name: course.name,
            description: course.description,
          }),
        }
      );
      setIsLoading(false);
      if (!response.ok) {
        toast.error("Update Lesson Failed", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.success("Update Lesson Successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 10000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
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
      setLessons(data);
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
  async function handleDeleteLesson() {}
  useEffect(() => {
    fetchCurrentLesson();
    fetchLessons();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="professor-lesson-list">
      <div className="professor-managment-sub-title">
        <h3>QUẢN LÝ CHỦ ĐỀ TỪ VỰNG</h3>
      </div>

      <form
        className="update-lesson"
        onSubmit={handleSubmit(UpdateCurrentLesson)}
      >
        <div style={{ width: "50%", textAlign: "center" }}>
          <div className="input-field">
            <input
              type="text"
              defaultValue={current_course.name}
              onFocus={() => setShowButton(true)}
              {...course("name", { required: true })}
            />
          </div>
          <error>
            {errors.name?.type === "required" && "Không được để trống tên"}
          </error>
        </div>
        {showButton && (
          <>
            <div className="input-field description">
              <textarea
                type="text"
                defaultValue={current_course.description}
                {...course("description", { required: true })}
              />
            </div>
            <error>
              {errors.description?.type === "required" &&
                "Không được để trống tên"}
            </error>
            <input
              type="submit"
              className="lesson-submit"
              value="Cập nhật"
            ></input>
          </>
        )}
      </form>

      <div className="professor-add-button-wrapper">
        <img
          onClick={() => navigate("/professor/course")}
          width="50"
          height="50"
          src="https://img.icons8.com/ios-filled/50/2d9358/reply-arrow.png"
          alt="reply-arrow"
        />
        <div className="professor-add-button" onClick={() => navigate("/")}>
          <img
            width="34"
            height="34"
            src="https://img.icons8.com/doodle/48/add.png"
            alt="add"
          />
          <h3>THÊM TỪ MỚI</h3>
        </div>
      </div>
      <div className="lesson-list-wrapper">
        {lessons &&
          lessons.map((lesson, index) => {
            return (
              <div key={index} className="lesson-list-item">
                <div className="">{lesson.title}</div>
                <div className="btn-wrapper">
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteLesson(lesson.idVoc)}
                  >
                    Xóa
                  </button>
                  <button className="update-btn" onClick={() => navigate("/")}>
                    Sửa
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default LessonManage;
