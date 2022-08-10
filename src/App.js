import logo from "./logo.svg";
import "./App.css";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Users from "./components/Users";
import Login from "./components/Login";

import { AuthContext, AuthProvider } from "./context/AuthContext";
import { AxiosContext, AxiosProvider } from "./context/AxiosContext";
import SignUp from "./components/SignUp";
import { GameContext } from "./context/GameContext";
import AddPlayers from "./components/AddPlayers";
import Title from "./components/Title";
import Dashboard from "./components/Dashboard";
import WinLoss from "./components/WinLoss";

function App() {
  const authContext = useContext(AuthContext);
  const gameContext = useContext(GameContext);
  const [status, setStatus] = useState("loading");

  const [userState, setUserState] = useState(false);

  const { publicAxios, authAxios } = useContext(AxiosContext);
  const loadJWT = useCallback(async () => {
    try {
      const game = localStorage.getItem("game");
      const allGame = localStorage.getItem("allGames");

      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const authenticated = localStorage.getItem("authenticated");
      const username = localStorage.getItem("username");

      authContext.setAuthState({
        accessToken: accessToken || null,
        refreshToken: refreshToken || null,
        authenticated: authenticated || null,
        username: username || null,
      });
      gameContext.setGameState(JSON.parse(game) || null);

      gameContext.setAllGames(JSON.parse(allGame) || null);

      setStatus("success");
      setUserState(true);
    } catch (error) {
      setStatus("error");
    }
  }, []);

  const { allGames, gameState } = gameContext;

  const setGame = (e, game) => {
    gameContext.setGameState({ ...game });
    localStorage.setItem("game", JSON.stringify(game));
  };

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);

  if (authContext?.authState?.authenticated) {
    return (
      <>
        <AddPlayers />
        {/* {typeof allGames !== "undefined"
          ? allGames.map((game, i) => (
              <>
                <div value={game} onClick={(e) => setGame(e, game)}>
                  <p>title:{game.title}</p>
                  <p>{i}</p>
                </div>
              </>
            ))
          : null} */}
        {typeof gameState.username !== "undefined" ? gameState.title : null}>
        {typeof gameContext.gameState.players !== "undefined" ? (
          gameContext.gameState.type === "win_loss" ? (
            <WinLoss />
          ) : (
            <Users />
          )
        ) : (
          []
        )}
      </>
    );
  } else {
    return (
      <>
        <Login />
        <SignUp />
      </>
    );
  }
}

export default App;
