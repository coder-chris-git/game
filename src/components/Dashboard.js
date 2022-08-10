import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";

const Dashboard = () => {
  const gameContext = useContext(GameContext);
  console.log(gameContext.gameState);
  if (gameContext?.gameState) {
    console.log("uo");
  } else {
    console.log("no`");
  }

  return <div>Dashboard</div>;
};

export default Dashboard;
