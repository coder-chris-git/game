import { ConsoleLogger } from "@aws-amplify/core";
import { Button, Input } from "@mui/material";
import React, { Component, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { AxiosContext } from "../context/AxiosContext";
import { GameContext } from "../context/GameContext";
import Users from "./Users";

function AddPlayers() {
  const [name, setName] = useState("");
  const authContext = useContext(AuthContext);
  const gameContext = useContext(GameContext);
  const { authAxios } = useContext(AxiosContext);

  const { players } = gameContext.gameState;

  const [showAddUserInput, setShowAddUserInput] = useState(false);

  const [list, setList] = useState(players || []);
  const [games, setGames] = useState();

  const addUser = async (e) => {
    console.log(list);
    if (!name) {
      return alert("user must have a name");
    }
    const userObject = {
      name: name,
      currentScore: 0,
      pastScore: 0,
      futureScore: 0,
      background: "",
      color: "",
    };

    const items = [...list];

    const index = items.findIndex((object) => {
      return object.name === userObject.name;
    });
    if (index !== -1) {
      return alert("user exists");
    }

    setList((list) => [...list, userObject]);

    setName("");
  };

  useEffect(() => {
    const setContext = async () => {
      console.log(list);
      const { gameState } = gameContext;

      console.log(gameState.players);
      await gameContext.setGameState({
        ...gameState,
        ["players"]: list,
      });

      await localStorage.setItem(
        "game",
        JSON.stringify({
          ...gameState,
          ["players"]: list,
        }),
      );
    };
    setContext();
  }, [list]);

  return (
    <>
      {showAddUserInput ? (
        <div>
          <Input title="username" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
          <Button onClick={(e) => addUser(e)} variant="contained">
            Add User
          </Button>
          <Button title="addUser" name="addUser" variant="contained" onClick={() => setShowAddUserInput(false)}>
            exit
          </Button>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button title="addUser" name="addUser" variant="contained" onClick={() => setShowAddUserInput(true)}>
            ADD PLAYERS
          </Button>
          <span>
            <Button onClick={(e) => authContext.logout(e)}>Logout</Button>
          </span>
        </div>
      )}
    </>
  );
}

export default AddPlayers;
