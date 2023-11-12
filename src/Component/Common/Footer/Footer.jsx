import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <div className=" container footer">
      <div className="footer-above">
        <div className="flexSB">
          <div className="logo">
            <h1><Link to="/">VictoryU</Link></h1>
            <span>ONLINE EDUCATION & LEARNING</span>
          </div>
        </div>
        <div className="footer-content">
          <h2>Về chúng tôi</h2>
          <ul className="footer-items">
            <li>Giới thiệu</li>
            <li>Liên hệ</li>
          </ul>
        </div>
        <div className="footer-content">
          <h2>Khám phá</h2>
          <ul className="footer-items">
            <li>
              <Link to="/listening-and-reading">Luyện nghe đọc</Link>
            </li>
            <li>
              <Link to="/practice-vocabulary">Từ vựng</Link>
            </li>
            <li>
              <Link to="/grammar">Ngữ pháp</Link>
            </li>
            <li>
              <Link to="/test">Đề thi thử</Link>
            </li>
            <li>
              <Link to="/forum">Diễn đàn</Link>
            </li>
          </ul>
        </div>
        <div className="footer-content">
          <h2>Kết nối với chúng tôi</h2>
          <div className="social">
            <i className="fab fa-facebook-f icon"></i>
            <i className="fab fa-instagram icon"></i>
            <i className="fab fa-twitter icon"></i>
            <i className="fab fa-youtube icon"></i>
          </div>
        </div>
      </div>
      <div className="footer-below">
        <p>
          Dự án này chỉ mang mục đích học tập nghiên cứu, không mang bất kỳ giá
          trị thương mại nào.
        </p>
      </div>
    </div>
  );
}

export default Footer;
