import React from "react";
import './Lifeline.css';

const Lifeline = ({ onFiftyFifty, onAskAudience, usedLifelines = {} }) => {
  const fiftyUsed = usedLifelines.fiftyFifty || false;
  const audienceUsed = usedLifelines.askAudience || false;

  return (
    <div className="lifeline-container">
      <button
        className={`lifeline-btn ${fiftyUsed ? "disabled-btn" : ""}`}
        onClick={onFiftyFifty}
        disabled={fiftyUsed}
      >
        50:50
      </button>

      <button
        className={`lifeline-btn ${audienceUsed ? "disabled-btn" : ""}`}
        onClick={onAskAudience}
        disabled={audienceUsed}
      >
        👥 Ask the Audience
      </button>
    </div>
  );
};

export default Lifeline;
