import React, { useEffect, useState } from "react";
import "./UpdateQuiz.css";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../../Common/Loader/Loader"

function UpdateQuiz() {
  const [current_quiz, setCurrentQuiz] = useState({});
  const { id } = useParams();
  const [showButton, setShowButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register: quiz,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleUpdate = async (register) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://localhost:7112/api/Quiz/UpdateQuiz/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idLesson: current_quiz.idLesson,
            title: register.title,
          }),
        }
      );
      setIsLoading(false);
      if (!response.ok) {
        toast.error("Update Quiz Failed", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.success("Update Quiz Successfully", {
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
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  async function fetchQuiz() {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://localhost:7112/api/Quiz/GetQuizById/${id}`
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
      setCurrentQuiz(data);
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
    fetchQuiz();
  }, []);

  if(isLoading){
    return <Loader/>
  }
  return (
    <div className="professor-update-quiz">
      <div className="professor-board-header">
        <div className="professor-managment-sub-title">
          <h3 style={{ marginLeft: "1rem", paddingRight: "1rem" }}>
            QUẢN LÝ QUIZ
          </h3>
        </div>
        <img
          width="50"
          height="50"
          src="https://img.icons8.com/ios-filled/50/2d9358/reply-arrow.png"
          alt="reply-arrow"
        />
      </div>
      <form className="update-quiz" onSubmit={handleSubmit(handleUpdate)}>
        <div style={{ width: "100%", textAlign: "center" }}>
          <div className="input-field">
            <input
              type="text"
              defaultValue={current_quiz.title}
              onFocus={() => setShowButton(true)}
              {...quiz("title", { required: true })}
            />
          </div>
          <error>
            {errors.title?.type === "required" && "Không được để trống tên"}
          </error>
        </div>
        {showButton && (
          <input type="submit" className="quiz-submit" value="Cập nhật"></input>
        )}
      </form>
      <div className="quiz-question-list-wrapper">
        
      </div>
    </div>
  );
}

export default UpdateQuiz;
