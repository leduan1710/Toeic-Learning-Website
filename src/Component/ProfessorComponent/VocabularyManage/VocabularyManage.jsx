import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../Common/Loader/Loader";
import { Link } from "react-router-dom";
import "./VocabularyManage.css";

function VocabularyManage() {
  const [topics, setTopic] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchVocabularyTopic() {
      try {
        const response = await fetch(
          "https://localhost:7112/api/VocTopic/GetAllVocTopic"
        );
        if (!response.ok) {
          const errorData = await response.json();
          toast.error(`${errorData.message}`, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
        const data = await response.json();
        setTopic(data);
        setIsLoading(false);
      } catch (error) {}
    }
    fetchVocabularyTopic();
    window.scrollTo(0, 0);
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="professor-vocabulary-wrapper">
      <div className="professor-managment-title">
        <h3>VOCABULARY MANAGEMENT</h3>
      </div>
      <div className="vocabulary-grid-wrapper">
        <div className="vocabulary-grid">
          <Link to="professor/test/addTest">
            <div className="vocabulary-item">
              <img
                width="180"
                height="180"
                src="https://img.icons8.com/nolan/100/add.png"
                alt="add"
              />
            </div>
          </Link>
          {topics.map((topic, index) => {
            return (
              <Link to={`/test/${topic.idVocTopic}`}>
                <div key={index} className="vocabulary-item">
                  <img
                    src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-vocabulary-literature-flaticons-lineal-color-flat-icons-2.png"
                    alt=""
                  />
                  <div className="vocabulary-title">{topic.name}</div>
                  <button className="btn">Delete</button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default VocabularyManage;
