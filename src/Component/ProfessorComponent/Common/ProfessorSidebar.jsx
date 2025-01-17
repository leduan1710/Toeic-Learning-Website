import React from "react";
import { Link } from "react-router-dom";

function ProfessorSidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <img src="https://img.icons8.com/papercut/100/user-female-circle.png" />
        </div>
        <svg
        className="close-icon"
          onClick={OpenSidebar}
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="30"
          height="30"
          viewBox="0 0 512 512"
        >
          <path
            fill="#E04F5F"
            d="M504.1,256C504.1,119,393,7.9,256,7.9C119,7.9,7.9,119,7.9,256C7.9,393,119,504.1,256,504.1C393,504.1,504.1,393,504.1,256z"
          ></path>
          <path
            fill="#FFF"
            d="M285,256l72.5-84.2c7.9-9.2,6.9-23-2.3-31c-9.2-7.9-23-6.9-30.9,2.3L256,222.4l-68.2-79.2c-7.9-9.2-21.8-10.2-31-2.3c-9.2,7.9-10.2,21.8-2.3,31L227,256l-72.5,84.2c-7.9,9.2-6.9,23,2.3,31c4.1,3.6,9.2,5.3,14.3,5.3c6.2,0,12.3-2.6,16.6-7.6l68.2-79.2l68.2,79.2c4.3,5,10.5,7.6,16.6,7.6c5.1,0,10.2-1.7,14.3-5.3c9.2-7.9,10.2-21.8,2.3-31L285,256z"
          ></path>
        </svg>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link
            style={{ display: "flex", gap: 5, alignItems: "center" }}
            to="professor/test"
          >
            <img
              width="34"
              height="34"
              src="https://img.icons8.com/external-nawicon-glyph-nawicon/64/external-exam-online-learning-nawicon-glyph-nawicon.png"
              alt="external-exam-online-learning-nawicon-glyph-nawicon"
            />{" "}
            Test
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link
            style={{ display: "flex", gap: 5, alignItems: "center" }}
            to="professor/vocabulary"
          >
            <img
              width="34"
              height="34"
              src="https://img.icons8.com/ios-filled/50/dictionary.png"
              alt="dictionary"
            />{" "}
            Vocabulary
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link
            style={{ display: "flex", gap: 5, alignItems: "center" }}
            to="professor/course"
          >
            <img
              width="34"
              height="34"
              src="https://img.icons8.com/ios-filled/50/1A1A1A/knowledge-sharing.png"
              alt="knowledge-sharing"
            />{" "}
            Course
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default ProfessorSidebar;
