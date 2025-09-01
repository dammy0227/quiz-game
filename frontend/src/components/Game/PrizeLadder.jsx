import React from "react";
import './price.css';

const PrizeLadder = ({ currentLevel, lastPrizeLevel, isGameOver, isPopup }) => {
  const prizes = [
    "$0", "$100", "$200", "$300", "$500", "$1,000",
    "$2,000", "$4,000", "$8,000", "$16,000", "$32,000"
  ];

  return (
    <div className={`prize-ladder ${isPopup ? "popup" : ""}`}>
      {prizes.map((prize, index) => {
        let className = "prize-item";

        if (!isGameOver && index === currentLevel && index !== 0) {
          className += " won"; // green for current prize
        }

        if (isGameOver && index === lastPrizeLevel && index !== 0) {
          className += " taken"; // yellow for taken prize
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
