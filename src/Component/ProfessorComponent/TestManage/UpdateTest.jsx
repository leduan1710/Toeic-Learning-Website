import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../Common/Loader/Loader";
import "./UpdateTest.css";
import { UserContext } from "../../../Context/UserContext";

function UpdateTest() {
  
  const { user } = useContext(UserContext);
  const [current_test, setCurrentTest] = useState({});
  const [testType, setTestType] = useState([]);
  const { id } = useParams();
  const [showButton, setShowButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register: test,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function fetchTestType() {
    try {
      const response = await fetch(
        "https://localhost:7112/api/TestType/GetAllTestTypes"
      );
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`${errorData.message}`, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
      const data = await response.json();
      setTestType(data);
      setIsLoading(false);
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
  }
  const handleUpdate = async (register) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://localhost:7112/api/Test/UpdaTetest/${id}&&${user.idUser}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idType: register.idType,
            idLesson: current_test.idLesson,
            name: register.name,
          }),
        }
      );
      setIsLoading(false);
      if (!response.ok) {
        toast.error("Update Test Failed", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.success("Update Test Successfully", {
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
  async function fetchTest() {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://localhost:7112/api/Test/GetTestById/${id}`
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
      setCurrentTest(data);
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
    fetchTest();
    fetchTestType();
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="professor-update-test">
      <div className="professor-board-header">
        <div className="professor-managment-sub-title">
          <h3 style={{ marginLeft: "1rem", paddingRight: "1rem" }}>
            QUẢN LÝ ĐỀ THI THỬ
          </h3>
        </div>
        <img
          width="50"
          height="50"
          src="https://img.icons8.com/ios-filled/50/2d9358/reply-arrow.png"
          alt="reply-arrow"
        />
      </div>
      <form className="update-test" onSubmit={handleSubmit(handleUpdate)}>
        <div style={{ width: "100%", textAlign: "center" }}>
          <div className="input-field">
            <input
              type="text"
              defaultValue={current_test.name}
              onFocus={() => setShowButton(true)}
              {...test("name", { required: true })}
            />
          </div>
          <error>
            {errors.name?.type === "required" && "Không được để trống tên"}
          </error>
        </div>
        {showButton && (
          <select className="test-type" {...test("idType", { required: true })}>
            {testType &&
              testType.map((type) => {
                return <option value={type.idTestType}>{type.typeName}</option>;
              })}
          </select>
        )}
        {showButton && (
          <input type="submit" className="test-submit" value="Cập nhật"></input>
        )}
      </form>
      <div className="test-question-list-wrapper"></div>
    </div>
  );
}

export default UpdateTest;
