import React from "react";
import "./Login.css";
import { useEffect } from "react";
import signinImage from "../../assets/signin.svg";
import signupImage from "../../assets/signup.svg";

function Login() {
    useEffect(() => {
      const sign_in_btn = document.querySelector("#sign-in-btn");
      const sign_up_btn = document.querySelector("#sign-up-btn");
      const container = document.querySelector(".login .container");
  
      const handleSignUpClick = () => {
        container.classList.add("sign-up-mode");
      };
  
      const handleSignInClick = () => {
        container.classList.remove("sign-up-mode");
      };
  
      if (sign_up_btn && sign_in_btn && container) {
        sign_up_btn.addEventListener("click", handleSignUpClick);
        sign_in_btn.addEventListener("click", handleSignInClick);
      }
  
      // Cleanup event listeners when component unmounts
      return () => {
        if (sign_up_btn && sign_in_btn && container) {
          sign_up_btn.removeEventListener("click", handleSignUpClick);
          sign_in_btn.removeEventListener("click", handleSignInClick);
        }
      };
    }, []);
  
    return (
      <div className="login">
        <div className="container">
        <div className="signin-signup">
          <form action="" className="sign-in-form">
            <h2 className="title">Đăng nhập</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" value="Login" className="btn" />
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
          </form>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Đã là thành viên?</h3>
              <p>Đăng nhập để trải nghiệm trang web ngay!!!</p>
              <button className="btn" id="sign-in-btn">
                Sign in
              </button>
            </div>
            <img src={signinImage} alt="" className="image" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>Bạn là người mới?</h3>
              <p>Đăng kí tài khoản để trải nghiệm trang web ngay bây giờ!!!</p>
              <button className="btn" id="sign-up-btn">
                Sign up
              </button>
            </div>
            <img src={signupImage} alt="" className="image" />
          </div>
        </div>
      </div>
      </div>
    );
  }
  
  export default Login;