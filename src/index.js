import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { AxiosProvider } from "./context/AxiosContext";
import { GameContext, GameProvider } from "./context/GameContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <AxiosProvider>
      <GameProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </GameProvider>
    </AxiosProvider>
  </AuthProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
