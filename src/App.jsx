import "./App.css";
import Scene from "./threejsComponents/Scene";
import SideBar from "./SideBar";
import { useState } from "react";
import { YAXIS } from "./threejsComponents/utils";

export default function App() {
  const defaultF = function (x) {
    return x ** 2;
  };
  const defaultG = function (x) {
    x ** 2;
  };

  const [f, setF] = useState(function () {});
  const [g, setG] = useState(function () {});
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1);
  const [globalRotationAxis, setGlobalRotationAxis] = useState(YAXIS);

  console.log(typeof f); // returns "undefined"
  console.log(typeof function () {}); // returns "function"
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
