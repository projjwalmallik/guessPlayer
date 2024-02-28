import React, { useState, useEffect } from "react";
import axios from "axios";

const StreakDisplay = ({ streak }) => {
  return (
    <div className="streak-display">
      <p>🔥 Streak: {streak} days</p>
    </div>
  );
};

export default StreakDisplay;
