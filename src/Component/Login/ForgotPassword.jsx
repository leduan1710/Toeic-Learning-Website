import React, { useState, useRef } from "react";
import "./ForgotPassword.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Loader from "../Common/Loader/Loader";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [is_email_click, seteEmailClick] = useState(false);

  const {
    register: resetPassworData,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const sendEmail = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://localhost:7112/api/Authen/SendForgotPasswordCode?email=${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );
      setIsLoading(false);
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`${errorData.message}`, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        const data = await response.json();
        toast.success(`${data.message}`, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 10000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        seteEmailClick(true);
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
  const ResetPassword = async (resetPassworData) => {
    console.log(email, getValues("otp"), getValues("password"));
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://localhost:7112/api/Authen/ForgotPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Email: email,
            OTP: getValues("otp"),
            NewPassword: getValues("password"),
          }),
        }
      );
      setIsLoading(false);
      console.log(response);
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`${errorData.message}`, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        const data = await response.json();
        toast.success(`${data.message}`, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 10000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        seteEmailClick(true);
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

  if (isloading) {
    return <Loader />;
  }

  return (
    <div className="forgot-password-wrapper">
      <div className="forgot-password-card">
        {!is_email_click ? (
          <div className="email-send-otp">
            <div>
              <img
                width="100"
                height="100"
                src="https://img.icons8.com/matisse/100/send-mass-email.png"
                alt="send-mass-email"
              />
              <h2>NHẬP EMAIL XÁC NHẬN</h2>
            </div>
            <div className="input-field">
              <input
                type="text"
                placeholder="Nhập Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="send-mail-image" onClick={sendEmail}>
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/color/48/sent--v2.png"
                  alt="sent--v2"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="reset-password-wrapper">
            <div>
              <h2 style={{ textAlign: "center" }}>ĐẶT LẠI MẬT KHẨU</h2>
              <p style={{ textAlign: "center" }}>
                OTP xác thực đã được gửi đến email
              </p>
            </div>
            <form
              className="confirm-otp-form"
              onSubmit={handleSubmit(ResetPassword)}
            >
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Nhập OTP"
                  {...resetPassworData("otp", { required: true })}
                />
              </div>
              <error>
                {errors.otp?.type === "required" && "OTP is required"}
              </error>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                  type="text"
                  placeholder="Nhập mật khẩu mới"
                  {...resetPassworData("password", {
                    required: true,
                    pattern:
                      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{6,}/,
                  })}
                />
              </div>
              <error>
                {errors.password?.type === "required" && "Password is required"}
                {errors.password?.type === "pattern" &&
                  "Phải có ít nhất 6 ký tự, một chữ hoa, một chữ thường, một chữ số, một ký tự đặc biệt"}
              </error>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Xác nhận mật khẩu"
                  {...resetPassworData("new_password", {
                    required: true,
                    validate: (value) =>
                      value === getValues("password") || "Mật khẩu không khớp",
                  })}
                />
                {!showPassword ? (
                  <i
                    class="fa-regular fa-eye"
                    onClick={() => setShowPassword(true)}
                  ></i>
                ) : (
                  <i
                    class="fa-regular fa-eye-slash"
                    onClick={() => setShowPassword(false)}
                  ></i>
                )}
              </div>
              <error>
                {errors.new_password?.type === "required" &&
                  "Confirm Password is required"}
                {errors.new_password?.type === "validate" &&
                  "Mật khẩu không khớp"}
              </error>
              <input type="submit" className="send-otp-submit"></input>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;