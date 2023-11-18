import React from "react";
import Heading from "../../Common/Header/Heading";
import "./Lesson.css";

function Lesson() {
  return (
    <div className="lesson-wrapper">
      <Heading title="TOEIC BASIC" />
      <div className="lesson-main">
        <div className="lesson-left-row">
          <div className="lesson-left-row-title">Các bài học khác</div>
          <div className="other-lessons">
            <hr />
            <div className="other-lessons-item">PRONOUNS</div>
            <div className="other-lessons-item">PRONOUNS</div>
            <div className="other-lessons-item">PRONOUNS</div>
            <div className="other-lessons-item">PRONOUNS</div>
            <div className="other-lessons-item">PRONOUNS</div>
            <hr />
          </div>
          <div className="lesson-quiz">
            <div className="lesson-quiz-item">QUIZ 1</div>
            <div className="lesson-quiz-item">QUIZ 2</div>
            <div className="lesson-quiz-item">QUIZ 3</div>
          </div>
        </div>
        <div className="lesson-right-row">
          <div className="lesson-content">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio
            suscipit adipisci saepe inventore fugit voluptates expedita eum
            itaque sequi, voluptatem quod dignissimos fugiat beatae. Iusto ullam
            iste quo dolores voluptates.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lesson;
