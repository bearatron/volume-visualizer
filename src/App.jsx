import "./App.css";
import Scene from "./threejsComponents/Scene";
import SideBar from "./SideBar";
import { useState } from "react";
import { STEP, YAXIS, findIntersectionPoints } from "./threejsComponents/utils";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "./Fallback";
import { ToastContainer, toast } from "react-toastify";

export default function App() {
  const [f, setF] = useState(() => (x) => x ** 2);
  const [g, setG] = useState(() => (x) => x ** 4);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1);
  const [globalRotationAxis, setGlobalRotationAxis] = useState(YAXIS);

  const [intersection1, setIntersection1] = useState(
    findIntersectionPoints(f, g, min, max, STEP)
  );

  const logWarning = () =>
    toast.info("log is calculated as the natural logarithm", {
      position: "bottom-right",
    });

  const errorToast = () =>
    toast.error("There are one or more errors", {
      position: "bottom-right",
    });

  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <div className="App">
        <SideBar
          setF={setF}
          setG={setG}
          setMin={setMin}
          setMax={setMax}
          setGlobalRotationAxis={setGlobalRotationAxis}
          setIntersection1={setIntersection1}
          logWarning={logWarning}
          errorToast={errorToast}
        />
        <Scene
          f={f}
          g={g}
          cutoffMin={min}
          cutoffMax={max}
          globalRotationAxis={globalRotationAxis}
          intersection1={intersection1}
        />

        <ToastContainer />
      </div>
    </ErrorBoundary>
  );
}
