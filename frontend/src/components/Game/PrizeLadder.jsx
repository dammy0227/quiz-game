import React from "react";
import "./price.css";

const PrizeLadder = ({ currentLevel, lastPrizeLevel, isGameOver, isPopup }) => {
  const prizes = [
    "$0", "$100", "$200", "$300", "$500", "$1,000",
    "$2,000", "$4,000", "$8,000", "$16,000", "$32,000"
  ];

  return (
    <div className={`prize-ladder ${isPopup ? "popup" : ""}`}>
      {prizes.map((prize, index) => {
        let className = "prize-item";

        // Highlight current prize when game is ongoing
        if (!isGameOver && index === currentLevel) {
          className += " won";
        }

        // Highlight last secured prize when game over
        if (isGameOver && index === lastPrizeLevel) {
          className += " taken";
        }

        return (
          <div key={index} className={className}>
            {prize}
          </div>
        );
      })}
    </div>
  );
};

export default PrizeLadder;
