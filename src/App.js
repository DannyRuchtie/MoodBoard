import React, { useState } from "react";
import { HotKeys } from "react-hotkeys";
import { motion } from "framer-motion";

import "./styles.css";
import ListItem from "./ListItem.js";
import Canvas from "./Canvas.js";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const variants = {
    open: { x: "-100%" },
    closed: { x: 0 }
  };

  const toggleMenu = React.useCallback(() => {
    console.log("yes");
    setIsOpen(!isOpen);

  });

  const keyMap = {
    TOGGLE_MENU: "m"
  };

  const handlers = {
    TOGGLE_MENU: toggleMenu
  };

  return (
    <HotKeys keyMap={keyMap} handlers={handlers}>
      <div className="container fullscreen" id="fullsccreen">
        {/* {state && (  )} */}

        <motion.div animate={isOpen ? "open" : "closed"} variants={variants}>
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

        {/* <button onClick={() => setIsOpen(!isOpen)}>Toggle</button> */}

        <Canvas />
      </div>
    </HotKeys>
  );
}
export default App;
