import React from "react";
import Heading from "../../Common/Header/Heading";
import "./LRCard.css";

function LRCard() {
  const partItem = [
    {
      id: 1,
      cover:
        "https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/96/external-picture-essentials-tanah-basah-basic-outline-tanah-basah-2.png",
      title: "Phần 1: Mô tả tranh",
      desc: "Thí sinh sẽ nghe 1 lần duy nhất 4 câu mô tả về một bức tranh. Sau đó chọn 1 đáp án mô tả đúng nhất bức tranh đó.",
    },
    {
      id: 2,
      cover:
        "https://img.icons8.com/external-nawicon-detailed-outline-nawicon/64/external-exam-back-to-school-nawicon-detailed-outline-nawicon.png",
      title: "Phần 2: Hỏi-đáp",
      desc: "Thí sinh sẽ nghe 1 lần duy nhất 3 câu hồi đáp cho 1 câu hỏi hoặc 1 câu nói. Sau đó chọn câu hồi đáp phù hợp nhất.",
    },
    {
      id: 3,
      cover:
        "https://img.icons8.com/external-justicon-lineal-justicon/64/external-lesson-elearning-and-education-justicon-lineal-justicon.png",
      title: "Phần 3: Đoạn hội thoại",
      desc: "Thí sinh sẽ nghe 1 lần duy nhất các đoạn hội thoại giữa 2 hoặc 3 người. Mỗi đoạn hội thoại sẽ có 3 câu hỏi, mỗi câu hỏi có 4 lựa chọn. Thí sinh đọc câu hỏi sau đó chọn câu trả lời phù hợp nhất. ",
    },
    {
      id: 4,
      cover: "https://img.icons8.com/ios/50/people-working-together.png",
      title: "Phần 4: Bài nói ngắn",
      desc: "Thí sinh sẽ nghe 1 lần duy nhất các bài nói ngắn. Mỗi bài sẽ có 3 câu hỏi, mỗi câu hỏi có 4 lựa chọn. Thí sinh đọc câu hỏi sau đó chọn câu trả lời phù hợp nhất.",
    },
    {
      id: 5,
      cover: "https://img.icons8.com/ios/50/people-working-together.png",
      title: "Phần 5: Hoàn thành câu",
      desc: "Chọn đáp án đúng nhất trong 4 đáp án để hoàn thành câu.",
    },
    {
      id: 6,
      cover: "https://img.icons8.com/ios/50/people-working-together.png",
      title: "Phần 6: Hoàn thành đoạn văn",
      desc: "Chọn đáp án đúng nhất trong 4 đáp án (từ, cụm từ hoặc câu) để hoàn thành đoạn văn. Mỗi đoạn văn sẽ có 4 câu hỏi.",
    },
    {
      id: 7,
      cover: "https://img.icons8.com/ios/50/people-working-together.png",
      title: "Phần 7: Đọc hiểu",
      desc: "Thí sinh sẽ đọc các bài đọc hiểu sau đó chọn đáp án đúng nhất cho các câu hỏi. Mỗi bài đọc sẽ bao gồm 2 - 5 câu hỏi.",
    },
  ];
  return (
    <div className="lr-card-wrapper">
      <section>
        <div className="container lr-card">
          <Heading subtitle="VictoryU" title="Tự học TOEIC theo từng Part" />
          <div className="card-wrapper-container">
            <div className="card-wrapper">
              {partItem.map((val) => {
                return (
                  <div key={val.id} className="card">
                    <div className="image">
                      <img src={val.cover} alt="" />
                    </div>
                    <h2>{val.title}</h2>
                    <p>{val.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LRCard;
