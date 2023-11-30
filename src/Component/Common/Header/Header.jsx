import React, { useContext } from "react";
import Head from "./Head";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "../../../Context/UserContext";

function Header() {
  const [click, setClick] = useState(false);
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  function handleLogout() {
    logout();
    navigate("/");
  }
  return (
    <div className="header">
      <Head />
      <header>
        <div className="flexSB">
          <ul
            className={click ? "mobile-nav" : "flexSB "}
            onClick={() => setClick(false)}
          >
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/courses">KHÓA HỌC</Link>
            </li>
            <li>
              <Link to="/practice-vocabulary">TỪ VỰNG</Link>
            </li>
            <li>
              <Link to="/test">
                ĐỀ THI THỬ <i className="fas fa-caret-down"></i>
                <div className="dropdown-menu">
                  <ul>
                    <div className="dropdown-item">
                      <Link to="/test/fullTest">FullTest</Link>
                    </div>
                    <div className="dropdown-item">
                      <Link to="/test/miniTest">MiniTest</Link>
                    </div>
                    <div className="dropdown-item">
                      <Link to="/test/simulation">Simulation Test</Link>
                    </div>
                  </ul>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/forum">DIỄN ĐÀN</Link>
            </li>
          </ul>
          {!user.auth ? (
            <div className="start">
              <div className="button">
                <Link to="/login">LOGIN</Link>
              </div>
            </div>
          ) : (
            <div className="navbar-user">
              <div className="navbar-user-infor">
                <div className="navbar-user-avatar">
                  <img
                    src="https://img.icons8.com/papercut/100/user-female-circle.png"
                    alt=""
                  />
                </div>
                <div className="navbar-user-name">Tran Ngo Bich Du</div>
                <i className="fas fa-caret-down"></i>
              </div>
              <div className="dropdown-menu">
                <ul>
                  <div className="dropdown-item">
                    <Link to="/user/profile">Trang cá nhân</Link>
                  </div>
                  <div className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </div>
                </ul>
              </div>
            </div>
          )}
          <button className="toggle" onClick={() => setClick(!click)}>
            {click ? (
              <i className="fa fa-times"> </i>
            ) : (
              <i className="fa fa-bars"></i>
            )}
          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;
