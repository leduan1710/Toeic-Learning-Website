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
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
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
            Test Manage
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
            Vocabulary Manage
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
            Course Manage
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default ProfessorSidebar;
