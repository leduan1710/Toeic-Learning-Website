import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../Common/Loader/Loader";
import { useNavigate } from "react-router-dom";
import "./ProfessorVocabularyTopic.css";
import AddVocabularyTopic from "./AddVocabularyTopic";

function ProfessorVocabularyTopic() {
  const [topics, setTopic] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
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
    } catch (error) {
      toast.error(`${error}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }
  async function DeleteVocabularyTopic(voc_topic_id) {
    try {
      const response = await fetch(
        `https://localhost:7112/api/VocTopic/DeleteVocTopic/${voc_topic_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
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
      setIsLoading(false);
      fetchVocabularyTopic();
      toast.success("Delete topic successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 10000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {}
  }
  useEffect(() => {
    fetchVocabularyTopic();
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (!modal) {
      fetchVocabularyTopic();
    }
  }, [modal]);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <AddVocabularyTopic toggleModal={toggleModal} modal_on={modal} />
      <div className="professor-vocabulary-wrapper">
        <div className="profssor-board-header">
          <div className="professor-managment-title">
            <h3>QUẢN LÝ CHỦ ĐỀ TỪ VỰNG</h3>
          </div>
          <div className="professor-add-button" onClick={toggleModal}>
            <img
              width="34"
              height="34"
              src="https://img.icons8.com/doodle/48/add.png"
              alt="add"
            />
            <h3>THÊM CHỦ ĐỀ MỚI</h3>
          </div>
        </div>
        <div className="vocabulary-grid-wrapper">
          <div className="vocabulary-grid">
            {topics && topics.map((topic, index) => {
              return (
                <div key={index} className="vocabulary-item">
                  <img
                    src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-vocabulary-literature-flaticons-lineal-color-flat-icons-2.png"
                    alt=""
                  />
                  <div className="vocabulary-title">{topic.name}</div>
                  <div className="btn-wrapper">
                    <button
                      className="delete-btn"
                      onClick={() => DeleteVocabularyTopic(topic.idVocTopic)}
                    >
                      Xóa
                    </button>
                    <button className="update-btn" onClick={()=>{navigate(`/professor/vocabulary/${topic.idVocTopic}`)}}>
                      Sửa
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfessorVocabularyTopic;
