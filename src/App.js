import React from "react";
import { motion } from "framer-motion";

import "./styles.css";
import ListItem from "./ListItem.js";
import Canvas from "./Canvas.js";

function App() {
  const [active, setActive] = React.useState(false);

  return (
    <div className="container fullscreen" id="fullsccreen">
      <motion.div
        className="rectangle"
        animate={active ? { opacity: 1, x: "-100%" } : { opacity: 1, x: 0 }}
        onClick={() => setActive(!active)}
      >
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
      </motion.div>

      <Canvas />
    </div>
  );
}
export default App;
