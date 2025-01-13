import "./App.css";
import Scene from "./threejsComponents/Scene";
import SideBar from "./SideBar";
import { useState } from "react";
import { STEP, YAXIS, findIntersectionPoints } from "./threejsComponents/utils";
import { FiSidebar } from "react-icons/fi";
import { motion, AnimatePresence } from "motion/react";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "./Fallback";

export default function App() {
  const [f, setF] = useState(() => (x) => x ** 2);
  const [g, setG] = useState(() => (x) => x ** 4);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1);
  const [globalRotationAxis, setGlobalRotationAxis] = useState(YAXIS);

  const [intersection1, setIntersection1] = useState(
    findIntersectionPoints(f, g, min, max, STEP)
  );
  const [sideBarVisible, setSideBarVisible] = useState(true);

  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <div className="App">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="sidebar-toggle"
          onClick={() => setSideBarVisible(!sideBarVisible)}
        >
          <FiSidebar size={24} className="sidebar-icon" />
        </motion.button>
        {/* // visibility: sideBarVisible ? "visible" : "hidden", */}
        <AnimatePresence initial={false}>
          {/* {sideBarVisible ? ( */}
          <motion.div
            key="sidebar"
            // initial={{ opacity: 0, x: -200 }}
            // animate={{ opacity: 1, x: 0 }}
            // exit={{ opacity: 0, x: -200 }}
            // transition={{ ease: "easeInOut" }}
            style={{ visibility: sideBarVisible ? "visible" : "hidden" }}
          >
            <SideBar
              setF={setF}
              setG={setG}
              setMin={setMin}
              setMax={setMax}
              setGlobalRotationAxis={setGlobalRotationAxis}
              setIntersection1={setIntersection1}
            />
          </motion.div>
          {/* ) : (
          <></>
        )} */}
        </AnimatePresence>
        <Scene
          f={f}
          g={g}
          cutoffMin={min}
          cutoffMax={max}
          globalRotationAxis={globalRotationAxis}
          intersection1={intersection1}
        />
      </div>
    </ErrorBoundary>
  );
}
