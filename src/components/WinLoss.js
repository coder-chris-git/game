import React, { useState, useEffect, useContext } from "react";
import {
  Input,
  Button,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Menu,
} from "@mui/material";
import CSS_COLOR_NAMES from "../colors";
import { GameContext } from "../context/GameContext";
import { AuthContext } from "../context/AuthContext";
import { AxiosContext, AxiosProvider } from "../context/AxiosContext";

const WinLoss = () => {
  const { authAxios } = useContext(AxiosContext);

  const gameContext = useContext(GameContext);

  const authContext = useContext(AuthContext);
  const { players } = gameContext.gameState;

  const [list, setList] = useState([...players]);
  const [newScore, setNewScore] = useState({});
  const [showEditScore, setShowEditScore] = useState({});
  const [game, setGame] = useState();

  const setScore = (e, user_name, math_function) => {
    const items = [...players];
    const index = items.findIndex((object) => {
      return object.name === user_name;
    });
    const item = items[index];
    if (math_function === "+") {
      item.wins = item.wins + 1;
    } else {
      item.losses = item.losses + 1;
    }
    items[index] = item;
    setList(items);
    setNewScore({ ...newScore, [user_name]: "" });
  };

  useEffect(() => {
    const setContext = async () => {
      await gameContext.setGameState({
        ...gameContext.gameState,
        ["players"]: list,
      });
      await localStorage.setItem(
        "game",
        JSON.stringify({
          ...gameContext.gameState,
          ["players"]: [...list],
        }),
      );
    };

    setContext();
  }, [list]);

  // useEffect(() => {
  //   const setContext = async () => {
  //     await gameContext.setGameState({
  //       game,
  //     });
  //     await localStorage.setItem(
  //       "game",
  //       JSON.stringify({
  //         game,
  //       }),
  //     );
  //   };

  //   setContext();
  // }, [game]);

  const color = [...CSS_COLOR_NAMES];
  const changeBackgroundColor = (e, id, style) => {
    const items = [...list];
    const index = items.findIndex((object) => {
      return object.name === id;
    });
    const item = items[index];
    item[style] = e.target.value;
    items[index] = item;
    setList(items);
  };

  // const setWins = (e, user_name) => {
  //   console.log("wins ");
  // };
  // const setLosses = (e) => {
  //   console.log("losses ");

  //   const items = [...players];
  //   const index = items.findIndex((object) => {
  //     return object.name === user_name;
  //   });
  //   const item = items[index];
  //   item.pastScore = item.currentScore;
  //   if (math_function === "+") {
  //     item.currentScore = item.currentScore + score;
  //   } else {
  //     item.currentScore = item.currentScore - score;
  //   }
  //   items[index] = item;
  //   setList(items);
  //   setNewScore({ ...newScore, [user_name]: "" });
  // };

  const onEditScore = (e, id) => {
    setShowEditScore({ ...showEditScore, [id]: true });
  };
  const onDoneEditScore = (e, id) => {
    setNewScore({ ...newScore, [id]: "" });

    setShowEditScore({ ...showEditScore, [id]: false });
  };

  const saveGame = async (e) => {
    console.log("game");
    const { gameState } = gameContext;
    const { username } = authContext.authState;

    console.log(username);
    console.log(gameState, username);
    console.log("yooo", username);
    try {
      const response = await authAxios.post("/save_game", {
        gameState: gameState,
        username: username,
      });
      setGame(response.data.message);
    } catch (error) {
      alert(error);
    }
  };

  const sortPlayers = players.sort((a, b) => b.wins / (b.losses + b.wins) > a.wins / (a.losses + a.wins));
  return (
    <>
      {" "}
      {typeof gameContext?.gameState?.players !== "undefined" ? (
        <Button
          onClick={(e) => {
            saveGame(e);
          }}
        >
          save game
        </Button>
      ) : null}
      <Table style={{ maxWidth: "40%" }}>
        <TableHead>
          <TableRow>
            <TableCell>Place</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Wins(+)</TableCell>
            <TableCell>Losses(-)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortPlayers.map((player, i) => (
            <TableRow key={player.name}>
              <TableCell style={{ background: player.background, color: player.text }}>{i + 1}</TableCell>
              <TableCell style={{ background: player.background, color: player.text }}>{player.name}</TableCell>
              <TableCell style={{ background: player.background, color: player.text }}>{player.wins}</TableCell>
              <TableCell style={{ background: player.background, color: player.text }}>{player.losses}</TableCell>
              <TableCell size="small" style={{ width: "50px", justifyContent: "center" }}>
                <span style={{ display: "flex", flexDirection: "row" }}>
                  <Button type="number" onClick={(e) => setScore(e, player.name, "+")}>
                    +
                  </Button>

                  <Button onClick={(e) => setScore(e, player.name, "-")}> - </Button>
                </span>
              </TableCell>
              <TableCell>
                {!showEditScore[player.name] ? (
                  <Button onClick={(e) => onEditScore(e, player.name)}>EDIT</Button>
                ) : (
                  <>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">{"Background"}</InputLabel>

                      <Select
                        style={{ background: player.background, width: "60px" }}
                        // labelId="demo-simple-select-label"
                        // id="demo-simple-select"
                        value={player.background || ""}
                        onChange={(e) => changeBackgroundColor(e, player.name, "background")}
                      >
                        {color.map((name) => (
                          <MenuItem value={name || ""} style={{ background: name, color: player.text }}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth style={{ color: player.text }}>
                      <InputLabel id="demo-simple-select-label">{"Font"}</InputLabel>

                      <Select
                        style={{ background: player.text }}
                        value={player.text || ""}
                        // labelId="demo-simple-select-label"
                        // id="demo-simple-select"
                        onChange={(e) => changeBackgroundColor(e, player.name, "text")}
                      >
                        {color.map((name) => (
                          <MenuItem value={name || ""} style={{ color: name, background: player.background }}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Button onClick={(e) => onDoneEditScore(e, player.name)}>Done</Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default WinLoss;
