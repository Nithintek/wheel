import "./App.css";
import "./styles.css";
import WheelComponent from "react-wheel-of-prizes";

import React, { useState } from "react";
import Wheel from "./wheel";

function App() {
  const segments = [
    "Better luck ",
    "10% off",
    "5% off",
    "Better luck ",
    "20% off",
    "15% off",
  ];
  const segColors = [
    "black",
    "#60BA97",
    "black",
    "#60BA97",
    "black",
    "#60BA97",
  ];
  const onFinished = (winner) => {
    console.log(winner);
  };
  const [email, setEmail] = useState("");
  const [enter, setEnter] = useState(false);
  return (
    <div className="App">
      <Wheel />
    </div>
  );
}

export default App;
