import React from "react";

import "./styles.css";
import ListItem from "./ListItem.js";
import Canvas from "./Canvas.js";

function App() {
  return (
    <div className="container ">
      <div className="navbar">
        <div className="header font-title">Moodoard</div>
        <ul>
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
        </ul>
        <div className="footer ont-secondary" />
      </div>

      <Canvas />
    </div>
  );
}
export default App;
