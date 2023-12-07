import HTMLReactParser from "html-react-parser";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import ".././CourseManage/Lesson/Quiz/UpdateQuiz.css";

import Loader from "../../Common/Loader/Loader";
import AddQuestion from "./AddQuestion";

function UpdateUnit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const editor = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [isUpdate, setIsUpdate] = useState(true);
  const [current_question, setCurrentQuestion] = useState({});

  const [idTest, setIdTest] = useState("");
  const [idTestPart, setidTestPart] = useState("");
  const [audio, setAudio] = useState("");
  const [image, setImage] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [transcript, setTranscript] = useState("");
  const [translation, setTranslation] = useState("");

  const [imagePreview, setImagePreview] = useState("");
  const [audioPreview, setAudioPreview] = useState("");
  const config = useMemo(
    () => ({
      toolbarButtonSize: "small",
      readonly: false,
    }),
    []
  );
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  const AddToggle = () => {
    setIsUpdate(false);
    toggleModal();
  };

  const updateToggle = (question) => {
    console.log(question);
    setCurrentQuestion(question);
    setIsUpdate(true);
    toggleModal();
  };
  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  useEffect(() => {
    let objectURL;
    if (image instanceof File || image instanceof Blob) {
      objectURL = URL.createObjectURL(image);
      setImagePreview(objectURL);
      return () => {
        URL.revokeObjectURL(objectURL);
      };
    } else {
      setImagePreview(image);
    }
  }, [image]);
  useEffect(() => {
    let objectURL;
    if (audio instanceof File || audio instanceof Blob) {
      objectURL = URL.createObjectURL(audio);
      setAudioPreview(objectURL);
      return () => {
        URL.revokeObjectURL(objectURL);
      };
    } else {
      setAudioPreview(audio);
    }
  }, [audio]);
  async function fetchTestUnit() {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://localhost:7112/api/TestQuestionUnit/GetTestQuestionUnitById/${id}`
      );
      setIsLoading(false);
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`${errorData.message}`, {
          position: toast.POSITION.BOTTOM_RIGHT, // Vị trí hiển thị
          autoClose: 5000, // Tự động đóng sau 3 giây
          closeOnClick: true, // Đóng khi click
          pauseOnHover: true, // Tạm dừng khi di chuột qua
          draggable: true, // Có thể kéo thông báo
        });
      }
      const data = await response.json();
      console.log(data);

      setImage(data.image || "");
      setAudio(data.audio || "");
      setParagraph(data.paragraph || "");
      setTranscript(data.script || "");
      setTranslation(data.translation || "");
      setidTestPart(data.idTestPart || "");
      setIdTest(data.idTest || "");
    } catch (error) {
      toast.error(`${error}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }
  useEffect(() => {
    fetchTestUnit();
    fetchQuestionByUnit();
  }, []);
  useEffect(() => {
    fetchTestUnit();
    fetchQuestionByUnit();
  }, [modal]);
  async function handleUpdateUnit() {
    const formData = new FormData();
    formData.append("idTest", idTest);
    formData.append("idTestPart", idTestPart);
    formData.append("paragraph", paragraph);
    formData.append("audio", audio);
    formData.append("image", image);
    formData.append("script", transcript);
    formData.append("translation", translation);

    const token = localStorage.getItem("token");
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://localhost:7112/api/TestQuestionUnit/UpdateTestQuestionUnit/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      setIsLoading(false);
      if (!response.ok) {
        toast.error("Update lesson failded", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.success("Update lesson successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 10000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.log(error);
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

  async function fetchQuestionByUnit() {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://localhost:7112/api/Question/GetAllQuestionByUnit/${id}`
      );
      setIsLoading(false);
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`${errorData.message}`, {
          position: toast.POSITION.BOTTOM_RIGHT, // Vị trí hiển thị
          autoClose: 5000, // Tự động đóng sau 3 giây
          closeOnClick: true, // Đóng khi click
          pauseOnHover: true, // Tạm dừng khi di chuột qua
          draggable: true, // Có thể kéo thông báo
        });
      }
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      toast.error(`${error}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="add-lesson-wrapper">
      <div className="professor-board-header">
        <div className="professor-managment-title">
          <h3 style={{ marginLeft: "1rem" }}>QUẢN LÝ QUIZ</h3>
        </div>
        <div onClick={toggleModal}>
          <img
            onClick={() => navigate("/professor/test")}
            width="50"
            height="50"
            src="https://img.icons8.com/ios-filled/50/2d9358/reply-arrow.png"
            alt="reply-arrow"
          />
        </div>
      </div>
      <div className="add-lesson-form-wrapper">
        <form onSubmit={handleUpdateUnit}>
          <div className="upload-image">
            <h3>Upload Image</h3>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            ></input>
            {image && (
              <img
                src={imagePreview}
                alt="Uploaded"
                style={{ maxWidth: "100%" }}
              />
            )}
          </div>
          <div className="upload-audio">
            <h3>Upload Audio</h3>
            <input
              type="file"
              onChange={(e) => setAudio(e.target.files[0])}
            ></input>
            {audio && <audio src={audioPreview} controls></audio>}
          </div>
          <h3>Nội dung đoạn văn</h3>
          <JoditEditor
            ref={editor}
            value={paragraph}
            onChange={(newContent) => setParagraph(newContent)}
            config={config}
          ></JoditEditor>
          <h3>Kiểm tra lại nội dung</h3>
          <div>{HTMLReactParser(String(paragraph))}</div>
          <div>
            <h3>Transcript</h3>
            <textarea
              placeholder="Nhập Transcript"
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
            ></textarea>
          </div>
          <div>
            <h3>Bản dịch</h3>
            <textarea
              placeholder="Nhập bản dịch"
              value={translation}
              onChange={(e) => setTranslation(e.target.value)}
            ></textarea>
          </div>
          <input
            type="submit"
            value="Cập nhật Unit"
            className="professor-add-lesson-btn"
          />
        </form>
      </div>
      {modal && (
        <AddQuestion
          isUpdate={isUpdate}
          toggleModal={toggleModal}
          modal_on={modal}
          initial_question={current_question}
          idUnit={id}
        />
      )}
      <div className="quiz-question-list-wrapper">
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div className="professor-add-button" onClick={AddToggle}>
            <img
              width="34"
              height="34"
              src="https://img.icons8.com/doodle/48/add.png"
              alt="add"
            />
            <h3>THÊM CÂU HỎI MỚI</h3>
          </div>
        </div>
        <div quiz-question-list-wrapper>
          {questions &&
            questions.map((question, index) => {
              return (
                <div
                  key={index}
                  className="quiz-question-list-wrapper"
                >
                  <div className="qquestion-list-item">
                    <div>{question.content}</div>
                    <div className="question-choice">
                      A. {question.choice_1}
                    </div>
                    <div className="question-choice">
                      B. {question.choice_2}
                    </div>
                    <div className="question-choice">
                      C. {question.choice_3}
                    </div>
                    <div className="question-choice">
                      D. {question.choice_4}
                    </div>
                    <div>{`=> ${
                      question.answer === "1"
                        ? question.choice_1
                        : question.answer === "2"
                        ? question.choice_2
                        : question.answer === "3"
                        ? question.choice_3
                        : question.choice_4
                    }`}</div>
                    <div>{question.explaination}</div>
                  </div>
                  <div className="btn-wrapper">
                    <button className="delete-btn">Xóa</button>
                    <button
                      className="update-btn"
                      onClick={() => updateToggle(question)}
                    >
                      Sửa
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default UpdateUnit;
