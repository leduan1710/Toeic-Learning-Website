/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import "./Login.css";
import { useEffect, useState } from "react";
import signinImage from "../../assets/signin.svg";
import signupImage from "../../assets/signup.svg";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import Loader from "../Common/Loader/Loader";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [signUpMode, setSignUpMode] = useState(false);
  const [username, setUserName] = useState("");
  const [pwd, setPwd] = useState("");
  const [checkPwd, setCheckPwd] = useState("");
  const [email, setEmail] = useState("");
  const [isloading, setIsLoading] = useState(false);

  const { userAuthen, loginContext } = useContext(UserContext);
  function containsUppercase(str) {
    return Boolean(str.match(/[A-Z]/));
  }
  useEffect(() => {
    window.scrollTo(0, 210);
  }, []);
  useEffect(() => {
  }, [pwd]);

  async function handleLogin(e) {
    e.preventDefault(true);
    setIsLoading(true);
    const response = await userAuthen(username, pwd);
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
    } else {
      const data = await response.json();
      if (data.token !== undefined) {
        loginContext(data.token);
        navigate("/");
      }
    }
  }

  async function handleSignUp(e) {
    e.preventDefault()
    try {
      const response = await fetch("https://localhost:7112/api/Authen/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: pwd,
        }),
      });
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

  if (isloading) {
    return <Loader />;
  }
  function SwitchSignUpMode(mode) {
    setSignUpMode(mode);
  }
  return (
    <div className="login-wrapper" id="login-wrapper">
      <div className="login">
        <div className={`container ${signUpMode ? "sign-up-mode" : null}`}>
          <div className="signin-signup">
            <form action="" className="sign-in-form">
              <div className="signin-input">
                <h2 className="title">Đăng nhập</h2>
                <div className="input-field">
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    placeholder="Tên đăng nhập"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="input-field">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    placeholder="Mật khẩu"
                    onChange={(e) => setPwd(e.target.value)}
                  />
                </div>
                <a className="forgot-password" href="">
                  Quên mật khẩu
                </a>
                <input
                  type="submit"
                  value="Đăng nhập"
                  className="btn"
                  onClick={handleLogin}
                />
                <p className="social-text">Đăng nhập bằng tài khoản khác</p>
                <div className="social-media">
                  <a href="#" className="social-icon">
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a href="" className="social-icon">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="" className="social-icon">
                    <i className="fab fa-google"></i>
                  </a>
                  <a href="" className="social-icon">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
                <button
                  className="sign-up-mobile"
                  id="sign-up-mobile"
                  onClick={() => SwitchSignUpMode(false)}
                >
                  Đăng kí tài khoản
                </button>
              </div>
            </form>
            <form action="" className="sign-up-form">
              <h2 className="title">Đăng kí</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Tên đăng nhập"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                  type="text"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  pattern="/^[^\s@]+@[^\s@]+\.[^\s@]+$/"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  onChange={(e) => setPwd(e.target.value)}
                />
              </div>
                <div className="password-weak">{checkPwd}</div>
              <input type="submit" value="Đăng ký" className="btn" onClick={handleSignUp}/>
              <p className="social-text">Đăng nhập bằng tài khoản khác</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <button
                className="sign-in-mobile"
                id="sign-in-mobile"
                onClick={() => SwitchSignUpMode(false)}
              >
                Đăng nhập
              </button>
            </form>
          </div>
          <div className="panels-container">
            <div className="panel left-panel">
              <div className="content">
                <h3>Đã là thành viên?</h3>
                <p>Đăng nhập để trải nghiệm trang web ngay!!!</p>
                <button
                  className="btn"
                  id="sign-in-btn"
                  onClick={() => SwitchSignUpMode(false)}
                >
                  Đăng nhập
                </button>
              </div>
              <img src={signinImage} alt="" className="image" />
            </div>
            <div className="panel right-panel">
              <div className="content">
                <h3>Bạn là người mới?</h3>
                <p>
                  Đăng kí tài khoản để trải nghiệm trang web ngay bây giờ!!!
                </p>
                <button
                  className="btn"
                  id="sign-up-btn"
                  onClick={() => SwitchSignUpMode(true)}
                >
                  Đăng ký
                </button>
              </div>
              <img src={signupImage} alt="" className="image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
