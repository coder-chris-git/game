// import React, { useState, useEffect, useContext, useCallback } from "react";
// import {
//   Input,
//   Button,
//   Table,
//   TableHead,
//   TableCell,
//   TableBody,
//   TableRow,
//   TableContainer,
//   Select,
//   Tab,
//   FormControl,
//   InputLabel,
//   MenuItem,
// } from "@mui/material";

// import { AuthContext } from "../context/AuthContext";
// import CSS_COLOR_NAMES from "../colors";
// import { GameContext } from "../context/GameContext";

// function TableTemplate(list) {
//   const authContext = useContext(AuthContext);
//   const gameContext = useContext(GameContext);
//   // const { setScore } = authContext;
//   const { players, headers } = authContext.gameState;
//   const { changeBackgroundColor } = gameContext.gameState;
//   const [showEditScore, setShowEditScore] = useState({});
//   const [newScore, setNewScore] = useState({});
//   const color = [...CSS_COLOR_NAMES];

//   const onEditScore = (e, id) => {
//     setShowEditScore({ ...showEditScore, [id]: true });
//   };
//   const onDoneEditScore = (e, id) => {
//     setNewScore({ ...newScore, [id]: "" });

//     setShowEditScore({ ...showEditScore, [id]: false });
//   };

//   const onSetNewScore = (value, user_name) => {
//     const scores = { ...newScore };
//     if (value === "") {
//       setNewScore({});
//     } else if (Number(value) > 1000) {
//       const newText = Number(value) - 1;
//       value = newText;
//     } else if (!Number(value) || isNaN(Number(value))) {
//       const newText = value.slice(0, -1);
//       value = newText;
//     } else if (isNaN(Number(value))) {
//       const newText = value.slice(0, -1);
//       value = newText;
//     } else {
//       scores[user_name] = value;
//       setNewScore(scores);
//     }
//   };

//   const setScore = (e, user_name, math_function) => {
//     const score = Number(newScore[user_name]);
//     if (!score) {
//       return;
//     }
//     const items = [...players];
//     const index = items.findIndex((object) => {
//       return object.name === user_name;
//     });
//     const item = items[index];
//     item.pastScore = item.currentScore;
//     if (math_function === "+") {
//       item.currentScore = item.currentScore + score;
//     } else {
//       item.currentScore = item.currentScore - score;
//     }
//     items[index] = item;
//     setList(items);
//     setNewScore({ ...newScore, [user_name]: "" });
//   };

//   return (
//     <div>
//       {list.map((player, i) => (
//         <TableRow style={{ width: "30px", maxWidth: "30px" }} key={player.name}>
//           <TableCell style={{ background: player.background, color: player.text }}>{i + 1}</TableCell>
//           <TableCell style={{ background: player.background, color: player.text }}>{player.name}</TableCell>
//           <TableCell style={{ background: player.background, color: player.text }}>{player.currentScore}</TableCell>
//           <TableCell size="small" style={{ width: "50px", justifyContent: "center" }}>
//             <Input
//               size="small"
//               // max="10000"
//               // min="1"
//               // disableUnderline={true}
//               // id={newScore + player.name}
//               value={newScore[player.name] || ""}
//               onChange={(e) => onSetNewScore(e.target.value, player.name)}
//             />

//             <span style={{ display: "flex", flexDirection: "row", width: "50px", justifyContent: "center" }}>
//               <Button type="number" onClick={(e) => setScore(e, player.name, "+")}>
//                 +
//               </Button>

//               <Button onClick={(e) => setScore(e, player.name, "-")}> - </Button>
//             </span>
//           {/* </TableCell> */}
//           <TableCell>
//             {!showEditScore[player.name] ? (
//               <Button onClick={(e) => onEditScore(e, player.name)}>EDIT</Button>
//             ) : (
//               <>
//                 <FormControl fullWidth>
//                   <InputLabel id="demo-simple-select-label">{"Background"}</InputLabel>

//                   <Select
//                     style={{ background: player.background, width: "60px" }}
//                     // labelId="demo-simple-select-label"
//                     // id="demo-simple-select"
//                     value={player.background || ""}
//                     onChange={(e) => changeBackgroundColor(e, player.name, "background")}
//                   >
//                     {color.map((name) => (
//                       <MenuItem value={name || ""} style={{ background: name, color: player.text }}>
//                         {name}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//                 <FormControl fullWidth style={{ color: player.text }}>
//                   <InputLabel id="demo-simple-select-label">{"Font"}</InputLabel>

//                   <Select
//                     style={{ background: player.text }}
//                     value={player.text || ""}
//                     // labelId="demo-simple-select-label"
//                     // id="demo-simple-select"
//                     onChange={(e) => changeBackgroundColor(e, player.name, "text")}
//                   >
//                     {color.map((name) => (
//                       <MenuItem value={name || ""} style={{ color: name, background: player.background }}>
//                         {name}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//                 <Button onClick={(e) => onDoneEditScore(e, player.name)}>Done</Button>
//               </>
//             )}
//           </TableCell>
//         </TableRow>
//       ))}
//     </div>
//     //     const scores = { ...newScore };
//     //     if (value === "") {
//     //       setNewScore({});
//     //     }

//     //     if (!Number(value) || isNaN(Number(value))) {
//     //       const newText = value.slice(0, -1);

//     //       value = newText;
//     //     } else if (isNaN(Number(value))) {
//     //       const newText = value.slice(0, -1);

//     //       value = newText;
//     //     } else {
//     //       scores[user_name] = value;

//     //       setNewScore(scores);
//     //     }
//     //   };
//     //   const onEditScore = (e, id) => {
//     //     setShowEditScore({ ...showEditScore, [id]: true });
//     //   };

//     //   const onDoneEditScore = (e, id) => {
//     //     setNewScore({ ...newScore, [id]: "" });

//     //     setShowEditScore({ ...showEditScore, [id]: false });
//     //   };
//     //   const sortPlayers = players.sort((a, b) => b.currentScore > a.currentScore);
//     //   const color = [...CSS_COLOR_NAMES];

//     //   return (
//     //     <>
//     //       <Table style={{ maxWidth: "300px" }}>
//     //         <TableHead>
//     //           <TableRow>
//     //             {gameHeaders.map((name) => (
//     //               <TableCell>{name}</TableCell>
//     //             ))}
//     //           </TableRow>
//     //         </TableHead>
//     //         <TableBody>
//     //           {sortPlayers.map((player, i) => (
//     //             <TableRow>
//     //               <TableCell className={player.name}>{i + 1}</TableCell>
//     //               <TableCell className={player.name}>{player.name}</TableCell>
//     //               <TableCell className={player.name}>{player.currentScore}</TableCell>

//     //               <TableCell>
//     //                 {!showEditScore[player.name] ? (
//     //                   <Button onClick={(e) => onEditScore(e, player.name)}>EDIT</Button>
//     //                 ) : (
//     //                   <>
//     //                     <>
//     //                       <Input
//     //                         // id={newScore + player.name}
//     //                         placeholder="#"
//     //                         value={newScore[player.name] || ""}
//     //                         onChange={(e) => onSetNewScore(e.target.value, player.name)}
//     //                       />
//     //                     </>
//     //                     <span style={{ display: "flex", flexdirection: "column" }}>
//     //                       <Button
//     //                         type="number"
//     //                         width="fit-content"
//     //                         onClick={(e) => setScore(e, player.name, "+", players, newScore)}
//     //                       >
//     //                         +
//     //                       </Button>

//     //                       <Button onClick={(e) => setScore(e, player.name, "-", players, newScore)}> - </Button>
//     //                       <Button onClick={(e) => onDoneEditScore(e, player.name)}> done</Button>
//     //                     </span>

//     //                     <select
//     //                       style={{ width: "50px" }}
//     //                       onChange={(e) => authContext.changeBackgroundColor(e, player.name, "background")}
//     //                       id={"color"}
//     //                     >
//     //                       {" "}
//     //                       <option>BG - color</option>
//     //                       {color.map((name) => (
//     //                         <option value={name} style={{ color: name }}>
//     //                           {name}
//     //                         </option>
//     //                       ))}
//     //                     </select>

//     //                     <select
//     //                       style={{ width: "50px" }}
//     //                       onChange={(e) => authContext.changeBackgroundColor(e, player.name, "text")}
//     //                       id={"color"}
//     //                     >
//     //                       <option> Text - color</option>
//     //                       {color.map((name) => (
//     //                         <option value={name} style={{ color: name }}>
//     //                           {name}
//     //                         </option>
//     //                       ))}
//     //                     </select>
//     //                   </>
//     //                 )}
//     //               </TableCell>
//     //             </TableRow>
//     //           ))}
//     //         </TableBody>
//     //       </Table>
//     //     </>
//     //   );
//   );
// }

// export default TableTemplate;
