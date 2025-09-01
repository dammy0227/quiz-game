import React from "react";
import './QuestionCard.css'

const QuestionCard = ({ question, options, onAnswer }) => {
  return (
    <div className="question-card">
      <h2 className="question-text">{question}</h2>
      <div className="options">
        {options.map((opt, index) => (
          <button
            key={index}
            className="option-btn"
            onClick={() => onAnswer(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
