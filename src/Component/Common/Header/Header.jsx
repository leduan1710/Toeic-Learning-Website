import React from "react";
import Head from "./Head";
import "./Header.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Header() {
  const [click, setClick] = useState(false);

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
                  <li>
                  <Link to="/test/fullTest">FullTest</Link>
                  </li>
                  <li>
                  <Link to="/test/miniTest">MiniTest</Link>
                  </li>
                  <li>
                  <Link to="/test/simulation">Simulation Test</Link>
                  </li>
                </ul>
              </div>
              </Link>
            </li>
            <li>
              <Link to="/forum">DIỄN ĐÀN</Link>
            </li>
          </ul>
          <div className="start">
            <div className="button">
              <Link to="/login">LOGIN</Link>
            </div>
          </div>
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
