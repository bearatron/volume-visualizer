import "./App.css";
import Scene from "./threejsComponents/Scene";
import SideBar from "./SideBar";
import { useState } from "react";
import { YAXIS } from "./threejsComponents/utils";

export default function App() {
  const [f, setF] = useState(() => (x) => x ** 2);
  const [g, setG] = useState(() => (x) => x ** 4);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1);
  const [globalRotationAxis, setGlobalRotationAxis] = useState(YAXIS);

  return (
    <div className="App">
      <SideBar
        setF={setF}
        setG={setG}
        setMin={setMin}
        setMax={setMax}
        setGlobalRotationAxis={setGlobalRotationAxis}
      />
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
