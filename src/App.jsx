import "./App.css";
import Scene from "./threejsComponents/Scene";
import SideBar from "./SideBar";
import { useState } from "react";
import { YAXIS } from "./threejsComponents/utils";
import { FiSidebar } from "react-icons/fi";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [f, setF] = useState(() => (x) => x ** 2);
  const [g, setG] = useState(() => (x) => x ** 4);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1);
  const [globalRotationAxis, setGlobalRotationAxis] = useState(YAXIS);

  const [sideBarVisible, setSideBarVisible] = useState(true);

  return (
    <div className="App">
      <motion.button
        whileTap={{ scale: 0.95 }}
        className="sidebar-toggle"
        onClick={() => setSideBarVisible(!sideBarVisible)}
      >
        <FiSidebar size={20} className="sidebar-icon" />
      </motion.button>
      <AnimatePresence initial={false}>
        {sideBarVisible ? (
          <motion.div
            initial={{ opacity: 1, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 1, x: -100 }}
          >
            <SideBar
              setF={setF}
              setG={setG}
              setMin={setMin}
              setMax={setMax}
              setGlobalRotationAxis={setGlobalRotationAxis}
            />
          </motion.div>
        ) : (
          <></>
        )}
      </AnimatePresence>
      <Scene
        f={f}
        g={g}
        cutoffMin={min}
        cutoffMax={max}
        globalRotationAxis={globalRotationAxis}
      />
    </div>
  );
}
