// import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
// import React, { useContext } from "react";
// import CSS_COLOR_NAMES from "../colors";
// import { GameContext } from "../context/GameContext";

// const EditPlayerDisplay = ({ player }) => {
//   const gameContext = useContext(GameContext);
//   const { players } = gameContext.gameState;
//   const color = [...CSS_COLOR_NAMES];
//   const list = [...players];
//   return (
//     <>
//       {" "}
//       <FormControl fullWidth style={{ marginBottom: "1%" }}>
//         <Select
//           // value={player.background || ""}
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           onChange={(e) => gameContext.changeBackgroundColor(e, player.name, "background")}
//         >
//           {color.map((name) => (
//             <MenuItem value={name || ""} style={{ background: name, color: player.text }}>
//               {/* {name} */}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       <FormControl fullWidth>
//         <Select
//           value={player.text || ""}
//           id="demo-simple-select"
//           onChange={(e) => gameContext.changeBackgroundColor(e, player.name, "text")}
//         >
//           {color.map((name) => (
//             <MenuItem value={name || ""} style={{ color: name, background: player.background }}>
//               {name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </>
//   );
// };

// export default EditPlayerDisplay;
