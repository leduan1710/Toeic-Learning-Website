import React from "react";
import "./AboutCard.css";
import Heading from "../../Common/Header/Heading";

function AboutCard() {
  const homeAbout = [
    {
      id: 1,
      cover: "https://img.icons8.com/external-smashingstocks-detailed-outline-smashing-stocks/66/external-Listening-overclocking-smashingstocks-detailed-outline-smashing-stocks.png",
      title: "Luyện Kỹ năng nghe đọc",
      desc: "Cung cấp các bài học theo từng Part của đề thi, giúp học viên hiểu thêm về cấu trúc đề thi cũng như cách làm từng phần tương ứng",
    },
    {
      id: 2,
      cover: "https://img.icons8.com/external-nawicon-detailed-outline-nawicon/64/external-exam-back-to-school-nawicon-detailed-outline-nawicon.png",
      title: "Đề thi thử",
      desc: "Cung cấp các đề thi thử toàn phần và từng phần, giúp học viên rèn luyện kỹ năng làm bài cũng như cọ sát với độ khó của đề thi thực",
    },
    {
      id: 3,
      cover: "https://img.icons8.com/external-justicon-lineal-justicon/64/external-lesson-elearning-and-education-justicon-lineal-justicon.png",
      title: "Các Lesson ngữ pháp từ vựng",
      desc: "Cung cấp các bài học ngữ pháp từ căn bản đến nâng cao giúp học viên dễ dàng học từ con số 0.Có từ vựng theo từng topic giúp học viên đa dạng hóa vốn từ vựng của bản thân.",
    },
    {
      id: 4,
      cover: "https://img.icons8.com/ios/50/people-working-together.png",
      title: "Diễn đàn thảo luận",
      desc: "Diễn đàn giúp học viên có thể giải quyết thắc mắc của bản thân cũng như giúp các học viên khác giải đáp các thắc mắc.",
    },
  ];

  return (
    <div className="aboutHome">
      <section>
        <div className="container about-card">
          <Heading subtitle="VictoryU" title="Nền tảng luyện thi TOEIC" />
          <div className="flexSB">
            <div className="left row">
              <img
                src="https://scintillating-smakager-860376.netlify.app/images/about.webp"
                alt=""
              />
            </div>
            <div className="right row">
              <div className="items">
                {homeAbout.map((val) => {
                  return (
                    <div key={val.id} className="item flexSB">
                      <div className="icon-img">
                        <img src={val.cover} alt="" />
                      </div>
                      <div className="text">
                        <h2>{val.title}</h2>
                        <p>{val.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutCard;
