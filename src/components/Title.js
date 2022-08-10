import { Button, Input } from "@mui/material";
import React, { useContext, useState } from "react";
import { GameContext } from "../context/GameContext";

const Title = () => {
  const gameContext = useContext(GameContext);
  const [title, setTitle] = useState();
  const onSetTitle = (e) => {
    setTitle(e.target.value);
  };
  const setGameTitle = (e) => {
    const game = gameContext.gameState;
    game.title = title;
    gameContext.setGameState(game);

    localStorage.setItem("game", JSON.stringify(game));
  };

  return (
    <>
      Title <Input value={title} onChange={(e) => onSetTitle(e)}></Input>
      <Button onClick={(e) => setGameTitle(e)}>setTitle</Button>
    </>
  );
};

export default Title;
