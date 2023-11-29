import React, { useContext } from "react";
import "./Login.css";
import { useEffect, useState } from "react";
import signinImage from "../../assets/signin.svg";
import signupImage from "../../assets/signup.svg";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

function Login() {
  const navigate = useNavigate();
  const [signUpMode, setSignUpMode] = useState(false);
  const [username, setUserName] = useState("");
  const [pwd, setPwd] = useState("");

  const { userAuthen } = useContext(UserContext);
  async function handleLogin(e) {
    e.preventDefault();
    await userAuthen(username, pwd);
    navigate("/");
  }
  function SwitchSignUpMode(mode) {
    setSignUpMode(mode);
  }
  return (
    <div className="login-wrapper">
      <div className="login">
        <div className={`container ${signUpMode ? "sign-up-mode" : null}`}>
          <div className="signin-signup">
            <form action="" className="sign-in-form">
              <h2 className="title">Đăng nhập</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Username"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPwd(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Login"
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
            </form>
            <form action="" className="sign-up-form">
              <h2 className="title">Đăng kí</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Username" />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="text" placeholder="Email" />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" />
              </div>
              <input type="submit" value="Sign up" className="btn" />
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
                  Sign in
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
                  Sign up
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
