import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import "./AddUnit.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../.././Common/Loader/Loader";
import HTMLReactParser from "html-react-parser";

function AddUnit({ isUpdate, current_unit, idQuestionUnit }) {
  const { id } = useParams();
  const editor = useRef(null);
  const config = useMemo(
    () => ({
      toolbarButtonSize: "small",
      readonly: false,
    }),
    []
  );

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  async function handleAddUnit(data) {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://localhost:7112/api/Lesson/AddUnit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idCourse: id,
            title: title,
            content: content,
          }),
        }
      );
      setIsLoading(false);
      if (!response.ok) {
        toast.error("Add lesson failded", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.success("Add lesson successfully", {
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

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="add-lesson-wrapper">
      <div className="add-lesson-form-wrapper">
        <form onSubmit={handleAddUnit}>
          <div className="upload-audio">
            <h3>Upload Audio</h3>
          </div>
          <div className="upload-image">
            <h3>Upload Image</h3>
          </div>
          <h3>Nội dung đoạn văn</h3>
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => setContent(newContent)}
            config={config}
          ></JoditEditor>
          <h3>Kiểm tra lại nội dung</h3>
          <div>{HTMLReactParser(String(content))}</div>
          <div>
            <h3>Transcript</h3>
            <input
              placeholder="Nhập tên bài học"
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
          <div>
            <h3>Bản dịch</h3>
            <input
              placeholder="Nhập tên bài học"
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
          <input
            type="submit"
            value="Thêm bài học"
            className="professor-add-lesson-btn"
          />
        </form>
      </div>
    </div>
  );
}

export default AddUnit;
