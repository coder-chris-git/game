import React, { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import CSS_COLOR_NAMES from "../colors";
import { AxiosContext } from "./AxiosContext";

const GameContext = createContext(null);
const { Provider } = GameContext;

const GameProvider = ({ children }) => {
  // const [gameState, setGameState] = useState({
  //   username: "chris",
  //   title: "next1",
  //   players: [
  //     { name: "nlkklnlk", currentScore: 0, pastScore: 0, futureScore: 0, background: "", color: "" },
  //     { name: "pk;lm;", currentScore: 0, pastScore: 0, futureScore: 0, background: "", color: "" },
  //     { name: ";lm", currentScore: 0, pastScore: 0, futureScore: 0, background: "", color: "" },
  //   ],
  //   rounds: [],
  //   eliminated: [],
  // });

  // const highScorePlayer = { name: "", currentScore: 0, pastScore: 0, futureScore: 0, background: "", color: "" };

  // const winLossPlayer = { name: "", wins: 0, losses: 0, background: "", color: "" };

  // {"username":"chris","title":"win_loss_1","players":[{"name":"black","wins":0,"losses":0,"background":"","color":""},{"name":"red","wins":0,"losses":0,"background":"","color":""},{"name":"green","wins":0,"losses":0,"background":"","color":""}],"rounds":[],"eliminated":[],"type":"win_loss"}

  const [gameState, setGameState] = useState({
    _id: "",
    username: "",
    title: "",
    players: [],
    rounds: [],
    eliminated: [],
  });
  const [allGames, setAllGames] = useState([]);

  // const color = [...CSS_COLOR_NAMES];

  const changeBackgroundColor = (e, id, style) => {
    const items = [...gameState.players];
    const index = items.findIndex((object) => {
      return object.name === id;
    });
    const item = items[index];
    item[style] = e.target.value;
    items[index] = item;

    setGameState({
      ...gameState,
      players: items,
    });
  };

  const authContext = useContext(AuthContext);
  const axiosContext = useContext(AxiosContext);
  console.log(axiosContext);

  const saveGame = async (e) => {
    const { username } = authContext.authState;

    try {
      const response = await axiosContext.authAxios.post("/save_game", {
        gameState: gameState,
        username: username,
        title: "color_game",
      });
      setGameState(response.data.message);
    } catch (error) {
      alert(error);
    }
  };

  // {"_id":"62e9f02ca321e2bb31f23b8c","username":"chris","gameState":{"_id":"","players":[],"rounds":[],"eliminated":[],"players":[{"name":"32e2","currentScore":0,"pastScore":0,"futureScore":0,"currentGame":"","background":"","color":""}]},"title":"new","newGame":false,"__v":0}

  // const addPlayer = (player) => {
  //   const { players } = gameState;
  //   const playersObj = [...players];
  //   playersObj.push(player);
  //   console.log(players, player);
  //   setGameState({
  //     ...gameState,
  //     ["player"]: playersObj,
  //   });
  // };

  return (
    <Provider
      value={{
        gameState,
        setGameState,
        allGames,
        setAllGames,
        saveGame,
        changeBackgroundColor,
      }}
    >
      {children}
    </Provider>
  );
};

export { GameContext, GameProvider };
