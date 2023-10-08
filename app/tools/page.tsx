"use client";
import React, { useState } from "react";

const Page = () => {
  const [oldRating, setOldRating] = useState("");
  const [newRating, setNewRating] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newRatingPoints = calculateNewRatingPoints(Number(oldRating));
    setNewRating(newRatingPoints.toString());
  };

  const calculateNewRatingPoints = (oldRatingPoints: number) => {
    const newRatingPoints = Math.round((oldRatingPoints - 600) / 7.5);
    return newRatingPoints;
  };

  return (
    <div>
      <h1>ECF Rating Points Converter</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Old ECF Rating Points:
          <input
            type="number"
            value={oldRating}
            onChange={(event) => setOldRating(event.target.value)}
          />
        </label>
        <button type="submit">Convert</button>
      </form>
      {newRating && <p>New ECF Rating Points: {newRating}</p>}
    </div>
  );
};

export default Page;
