import React from "react";
import "./QuestionCard.css";

const QuestionCard = ({
  question,
  options = [],
  onAnswer,
  selectedAnswer,   // ✅ Pass selected answer from parent
  correctAnswer,    // ✅ Pass correct answer from parent
}) => {

  const handleClick = (opt) => {
    if (selectedAnswer) return; // prevent re-answering
    onAnswer(opt);
  };

  return (
    <div className="question-card">
      <h2 className="question-text">{question || "No question available"}</h2>

      <div className="options">
        {options.length > 0 ? (
          options.map((opt) => {
            let className = "option-btn";

            // ✅ Apply coloring based on selected answer and correctness
            if (selectedAnswer) {
              if (opt === correctAnswer) className += " correct";
              else if (opt === selectedAnswer && opt !== correctAnswer) className += " wrong";
            }

            return (
              <button
                key={`${question}-${opt}`}
                className={className}
                onClick={() => handleClick(opt)}
                disabled={!!selectedAnswer} // disable if already answered
              >
                {opt}
              </button>
            );
          })
        ) : (
          <p>No options available.</p>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
