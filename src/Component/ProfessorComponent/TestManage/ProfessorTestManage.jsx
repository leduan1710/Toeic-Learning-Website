import React, { useContext, useEffect, useState } from "react";
import "./ProfessorTestManage.css";
import { toast } from "react-toastify";
import Loader from "../../Common/Loader/Loader";
import AddTest from "./AddTest";
import { UserContext } from "../../../Context/UserContext";
import { useNavigate } from "react-router-dom";

function ProfessorTestManage() {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [tests, setTest] = useState([]);
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  async function fetchTests() {
    try {
      const response = await fetch(
        `https://localhost:7712/api/Test/GetAllTestByProfessor/${user.idUser}`
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
      setTest(data);
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
  useEffect(() => {
    fetchTests();
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    fetchTests();
    window.scrollTo(0, 0);
  }, [modal]);

  async function DeleteTest(testId) {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `https://localhost:7712/api/Test/DeleteTest/${testId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        toast.error(`${"Delete test failed"}`, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
      setIsLoading(false);
      toast.success("Delete test successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 10000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      fetchTests();
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
    <>
      {<AddTest toggleModal={toggleModal} modal_on={modal} />}
      <div className="professor-test-wrapper">
        <div className="professor-board-header">
          <div className="professor-managment-title">
            <h3>QUẢN LÝ ĐỀ THI THỬ</h3>
          </div>
          <div className="professor-add-button" onClick={toggleModal}>
            <img
              width="34"
              height="34"
              src="https://img.icons8.com/doodle/48/add.png"
              alt="add"
            />
            <h3>THÊM ĐỀ THI MỚI</h3>
          </div>
        </div>
        <div className="test-grid-wrapper">
          <div className="test-grid">
            {tests &&
              tests.map((test, index) => {
                return (
                  <div key={index} className="test-item">
                    <img
                      src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/100/external-online-test-online-education-flaticons-lineal-color-flat-icons-2.png"
                      alt=""
                    />
                    <div className="test-title">{test.name}</div>
                    <div className="btn-wrapper">
                      <button
                        className="delete-btn"
                        onClick={() => DeleteTest(test.idTest)}
                      >
                        Xóa
                      </button>
                      <button
                        className="update-btn"
                        onClick={() => {
                          navigate(`/professor/test/${test.idTest}`);
                        }}
                      >
                        Sửa
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfessorTestManage;
