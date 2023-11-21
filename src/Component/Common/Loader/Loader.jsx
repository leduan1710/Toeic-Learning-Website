import React from "react";
import { useEffect } from "react";
import "./Loader.css";

function Loader({ bool }) {

  return (
    <div className="loader-wrapper">
      <div className="loader"></div>
    </div>
  );
}

export default Loader;
