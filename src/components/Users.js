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
import "./styles.css";
import CSS_COLOR_NAMES from "../colors";
import { GameContext } from "../context/GameContext";
import { AuthContext } from "../context/AuthContext";
import { AxiosContext, AxiosProvider } from "../context/AxiosContext";

const Users = (initialState) => {
  const { authAxios } = useContext(AxiosContext);

  const gameContext = useContext(GameContext);

  const authContext = useContext(AuthContext);
  const { players } = gameContext.gameState;

  const [list, setList] = useState([...players]);
  const [newScore, setNewScore] = useState({});
  const [showEditScore, setShowEditScore] = useState({});
  const [game, setGame] = useState();

  const onSetNewScore = (value, user_name) => {
    const scores = { ...newScore };
    if (value === "") {
      setNewScore({});
      // } else if (Number(value) > 5000) {
      //   const newText = Number(value) - 1;
      //   value = newText;
    } else if (!Number(value) || isNaN(Number(value))) {
      const newText = value.slice(0, -1);
      value = newText;
    } else if (isNaN(Number(value))) {
      const newText = value.slice(0, -1);
      value = newText;
    } else {
      scores[user_name] = value;
      setNewScore(scores);
    }
  };

  const setScore = (e, user_name, math_function) => {
    const score = Number(newScore[user_name]);
    if (!score) {
      return;
    }

    const items = [...players];
    const index = items.findIndex((object) => {
      return object.name === user_name;
    });
    const item = items[index];
    item.pastScore = item.currentScore;
    if (math_function === "+") {
      item.currentScore = item.currentScore + score;
    } else {
      item.currentScore = item.currentScore - score;
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
  // const changeBackgroundColor = (e, id, style) => {
  //   const items = [...list];
  //   const index = items.findIndex((object) => {
  //     return object.name === id;
  //   });
  //   const item = items[index];
  //   item[style] = e.target.value;
  //   items[index] = item;
  //   setList(items);
  // };

  // const { changeBackgroundColor } = gameContext;

  const onEditScore = (e, id) => {
    setShowEditScore({ ...showEditScore, [id]: true });
  };
  const onDoneEditScore = (e, id) => {
    setNewScore({ ...newScore, [id]: "" });

    setShowEditScore({ ...showEditScore, [id]: false });
  };

  const eliminatePlayer = (e, user_name) => {
    const items = [...list];
    const index = items.findIndex((object) => {
      return object.name === user_name;
    });

    const item = items[index];
    if (item.eliminated) {
      item.eliminated = false;
    } else {
      item.eliminated = true;
    }
    items[index] = item;
    setList(items);
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
        title: "color_game",
      });
      setGame(response.data.message);
    } catch (error) {
      alert(error);
    }
  };

  const sortPlayers = players.sort((a, b) => b.currentScore > a.currentScore);
  const firstHalfPlayers = players.slice(0, sortPlayers.length / 2);
  const secondHalfPlayers = players.slice(sortPlayers.length / 2);
  const first = firstHalfPlayers.slice(0, firstHalfPlayers.length / 2);
  const second = firstHalfPlayers.slice(firstHalfPlayers.length / 2, firstHalfPlayers.length);
  const third = secondHalfPlayers.slice(0, secondHalfPlayers.length / 2);
  const last = secondHalfPlayers.slice(secondHalfPlayers.length / 2);
  console.log(sortPlayers[sortPlayers.length - 1].background_image);

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
      ) : (
        ""
      )}
      <Table
        className="tablerow"
        justifyContent="space-evenly"

        /* Clear floats after the columns */
      >
        <TableHead>
          <TableRow></TableRow>
        </TableHead>
        <TableBody
          style={{
            maxHeight: "700px",

            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          {/* {first.map((player, i) => (
            <TableRow style={{ width: "30px", maxWidth: "30px" }} key={player.name}>
              <TableCell style={{ background: player.background, color: player.text }}>{i + 1}</TableCell>
              <TableCell style={{ background: player.background, color: player.text }}>{player.name}</TableCell>
              <TableCell style={{ background: player.background, color: player.text }}>{player.currentScore}</TableCell>
              <TableCell size="small" style={{ width: "50px", justifyContent: "center" }}>
                <Input
                  size="small"
                  // max="10000"
                  // min="1"
                  // disableUnderline={true}
                  // id={newScore + player.name}
                  value={newScore[player.name] || ""}
                  onChange={(e) => onSetNewScore(e.target.value, player.name)}
                />

                <span style={{ display: "flex", flexDirection: "row", width: "50px", justifyContent: "center" }}>
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
          {second.map((player, i) => (
            <TableRow style={{ width: "30px", maxWidth: "30px" }} key={player.name}>
              <TableCell style={{ background: player.background, color: player.text }}>{i + 1}</TableCell>
              <TableCell style={{ background: player.background, color: player.text }}>{player.name}</TableCell>
              <TableCell style={{ background: player.background, color: player.text }}>{player.currentScore}</TableCell>
              <TableCell size="small" style={{ width: "50px", justifyContent: "center" }}>
                <Input
                  size="small"
                  // max="10000"
                  // min="1"
                  // disableUnderline={true}
                  // id={newScore + player.name}
                  value={newScore[player.name] || ""}
                  onChange={(e) => onSetNewScore(e.target.value, player.name)}
                />

                <span style={{ display: "flex", flexDirection: "row", width: "50px", justifyContent: "center" }}>
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

          {third.map((player, i) => (
            <TableRow style={{ width: "30px", maxWidth: "30px" }} key={player.name}>
              <TableCell style={{ background: player.background, color: player.text }}>{i + 1}</TableCell>
              <TableCell style={{ background: player.background, color: player.text }}>{player.name}</TableCell>
              <TableCell style={{ background: player.background, color: player.text }}>{player.currentScore}</TableCell>
              <TableCell size="small" style={{ width: "50px", justifyContent: "center" }}>
                <Input
                  size="small"
                  // max="10000"
                  // min="1"
                  // disableUnderline={true}
                  // id={newScore + player.name}
                  value={newScore[player.name] || ""}
                  onChange={(e) => onSetNewScore(e.target.value, player.name)}
                />

                <span style={{ display: "flex", flexDirection: "row", width: "50px", justifyContent: "center" }}>
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
          ))} */}

          {players.map((player, i) => (
            <TableRow
              key={player.name}
              style={{
                // backgroundImage: `url(../html_files/${player.background_image})`,
                display: "flex",
                // justifyContent: "space-between",
                background: player.background,
                color: player.text,
                width: "18%",
              }}
            >
              <TableCell
                style={{
                  background: player.background,
                  color: player.text,
                }}
              >
                {i + 1}
              </TableCell>
              <TableCell style={{ background: player.background, color: player.text }}>{player.name}</TableCell>
              {player.eliminated ? (
                <img
                  height={"20px"}
                  width="20px"
                  src="/x.png"
                  style={{ backgroundColor: "transparent" }}
                  alt="eliminated"
                />
              ) : (
                ""
              )}

              <TableCell className={player.name} style={{ background: player.background, color: player.text }}>
                {player.currentScore}
              </TableCell>
              <TableCell size="small" style={{ justifyContent: "center", maxWidth: "40px" }}>
                <Input
                  size="small"
                  // max="10000"
                  // min="1"
                  // disableUnderline={true}
                  // id={newScore + player.name}
                  value={newScore[player.name] || ""}
                  onChange={(e) => onSetNewScore(e.target.value, player.name)}
                />

                <span style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                  <Button type="number" onClick={(e) => setScore(e, player.name, "+")}>
                    +
                  </Button>

                  <Button onClick={(e) => setScore(e, player.name, "-")}> - </Button>
                </span>
              </TableCell>
              <TableCell style={{ height: "50px" }}>
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
                        onChange={(e) => gameContext.changeBackgroundColor(e, player.name, "background")}
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
                        onChange={(e) => gameContext.changeBackgroundColor(e, player.name, "text")}
                      >
                        {color.map((name) => (
                          <MenuItem value={name || ""} style={{ color: name, background: player.background }}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Button onClick={(e) => eliminatePlayer(e, player.name)}>Eliminate</Button>

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

export default Users;
