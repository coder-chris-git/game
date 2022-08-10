import { Button, Input } from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { AxiosContext } from "../context/AxiosContext";
import { GameContext } from "../context/GameContext";

const Login = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext);
  const { authAxios } = useContext(AxiosContext);
  const gameContext = useContext(GameContext);
  const [list, setList] = useState();

  const [state, setState] = useState({ username: "", password: "" });

  function setValue(e) {
    const value = e.target.value;
    setState({
      ...state,

      [e.target.name]: value,
    });
  }
  const onLogin = async () => {
    const { username, password } = state;
    console.log(username);
    try {
      const response = await publicAxios.post("/login", {
        username,
        password,
      });

      const { accessToken, refreshToken, user, currentGame, allGames } = response.data;
      console.log("user", response.data);

      const authenticated = user.authenticated;
      console.log(currentGame);
      console.log(authContext);
      if (currentGame) {
        gameContext.setGameState({
          ...currentGame,
        });
      }
      if (allGames) {
        gameContext.setAllGames(allGames);
      }

      authContext.setAuthState({
        accessToken,
        refreshToken,
        username,
        authenticated,
      });

      // // console.log(43 + authContext.authState.token);

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("authenticated", true);
      localStorage.setItem("username", username);
      localStorage.setItem("game", JSON.stringify(currentGame));
      localStorage.setItem("allGames", JSON.stringify(allGames));

      console.log(currentGame);
    } catch (error) {
      alert("Login Failed", error);
    }
  };

  // useEffect(() => {
  //   localStorage.setItem("game", list);

  //   gameContext.setGameState({
  //     list,
  //   });
  // }, [list]);

  // const getGame = async () => {
  //   const { username, password } = state;

  //   try {
  //     const response = await publicAxios.get("/game", {
  //       params: {
  //         username: username,
  //         title: "new",
  //       },
  //     });

  //     console.log(response.data);

  //     const { gameState } = response.data;

  //     await localStorage.setItem("game", JSON.parse(gameState));
  //     // navigation.navigate("ConfirmUser", { params: { email: email } });
  //     await gameContext.setGameState({
  //       ...gameState,
  //     });
  //   } catch (error) {
  //     if (error.response.status === 400) {
  //       alert("no game", error.response);
  //     }
  //     alert("Loweojaisofod", error.response.data.message);
  //   }
  // };

  return (
    <div>
      <Input name="username" onChange={(e) => setValue(e)} placeholder="username" />
      <Input name="password" onChange={(e) => setValue(e)} placeholder="password" />
      <Button type="button" title="button" onClick={(e) => onLogin(e)}>
        Login
      </Button>
    </div>
  );
};

export default Login;
