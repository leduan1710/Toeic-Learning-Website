import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../../Context/UserContext";
import Loader from "../../Common/Loader/Loader";
import "./UserManage.css";

function UserManage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  async function resetPassword(email) {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://localhost:7112/api/Admin/ResetPassword/${email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );
      setIsLoading(false);
      if (!response.ok) {
        toast.error("Reset password failed", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.success("reset password successfully", {
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

  async function fetchUsers() {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://localhost:7112/api/Admin/GetAllUsers`
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
      setUsers(data);
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

  async function deleteUserById(id) {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://localhost:7112/api/Admin/DeleteUser/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );
      setIsLoading(false);
      if (!response.ok) {
        const errorData = await response.json();
        console.log(response);
        toast.error(`${errorData.message}`, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.success("Delete Topic Successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 10000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        fetchUsers();
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
  }
  useEffect(() => {
    fetchUsers();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='professor-lesson-list'>
      <div className='professor-managment-sub-title'>
        <h3 style={{ paddingLeft: "10px" }}>QUẢN LÝ NGƯỜI DÙNG</h3>
      </div>

      <div className='professor-add-button-wrapper'>
        <img
          onClick={() => navigate("/admin")}
          width='50'
          height='50'
          src='https://img.icons8.com/ios-filled/50/2d9358/reply-arrow.png'
          alt='reply-arrow'
        />
        <div
          className='professor-add-button'
          onClick={() => navigate(`/admin/user/add`)}
        >
          <img
            width='34'
            height='34'
            src='https://img.icons8.com/doodle/48/add.png'
            alt='add'
          />
          <h3>THÊM NGƯỜI DÙNG MỚI MỚI</h3>
        </div>
      </div>
      <div className='wordList-wrapper'>
        {users &&
          users.map((item, index) => {
            return (
              <div key={index} className='wordList-item'>
                <div className='user-fullname'>{item?.fullname}</div>
                <div className='user-username'>{item?.username}</div>
                <div className='user-email'>{item?.email}</div>
                <div className='btn-wrapper'>
                  <button
                    className='delete-btn'
                    onClick={() => deleteUserById(1)}
                  >
                    Xóa
                  </button>
                  <button
                    className='update-btn'
                    onClick={() => resetPassword(user?.email)}
                  >
                    Reset password
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default UserManage;
