import React, { useState, useEffect } from "react";
import "./QuestionCard.css";

const QuestionCard = ({ question, options = [], onAnswer }) => {
  const [selected, setSelected] = useState(null);

  // 🧹 Reset selected option whenever a new question comes in
  useEffect(() => {
    setSelected(null);
  }, [question]);

  const handleClick = (opt) => {
    setSelected(opt);
    onAnswer(opt);
  };

  return (
    <div className="question-card">
      <h2 className="question-text">{question || "No question available"}</h2>

      <div className="options">
        {options.length > 0 ? (
          options.map((opt) => (
            <button
              key={`${question}-${opt}`} // ✅ Unique key to reset per question
              className={`option-btn ${selected === opt ? "selected" : ""}`}
              onClick={() => handleClick(opt)}
              disabled={!!selected} // ✅ Disable after selection to avoid double clicks
            >
              {opt}
            </button>
          ))
        ) : (
          <p>No options available.</p>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
