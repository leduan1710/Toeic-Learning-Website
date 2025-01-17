import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Head() {
  return (
    <div className="head">
      <div className="flexSB">
        <div className="logo">
          <h1><Link to="/">VictoryU</Link></h1>
          <span>ONLINE EDUCATION & LEARNING</span>
        </div>

        <div className="social">
          <i className="fab fa-facebook-f icon"></i>
          <i className="fab fa-instagram icon"></i>
          <i className="fab fa-twitter icon"></i>
          <i className="fab fa-youtube icon"></i>
        </div>
      </div>
    </div>
  );
}
