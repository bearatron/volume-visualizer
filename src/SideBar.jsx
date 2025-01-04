import "./SideBar.css";
import { useState } from "react";
import { parseTex } from "tex-math-parser";
import * as math from "mathjs";
import { addStyles, EditableMathField } from "react-mathquill";

addStyles();

export default function SideBar() {
  const [latex, setLatex] = useState("");
  const [equationVar, setEquationVar] = useState(0);
  const [ansText, setAnsText] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  function handleSubmit() {
    console.log("button pressed!");
    console.log(typeof equationVar);

    const node = parseTex(latex);
    const code = node.compile();
    const mathJSAns = code.evaluate({ x: equationVar });
    console.log(mathJSAns);

    setAnsText(mathJSAns.toString());
  }

  function handleVarChange(e) {
    const val = Number(e.target.value);
    if (isNaN(val)) {
      setErrorMsg("Please enter a number");
    } else {
      setEquationVar(val);
      setErrorMsg("");
    }
  }

  function handleFunctionChange(mathField) {
    setLatex(mathField.latex());
  }

  return (
    <div className="sidebar">
      <h1>Volume Visualizer</h1>

      <EditableMathField latex={latex} onChange={handleFunctionChange} />

      <p>LaTeX Output:</p>
      <p>{latex}</p>

      <hr />
      <div className="input-group">
        <p>x:</p>
        <input
          type="text"
          name="equationInput"
          id="equation-input"
          onChange={handleVarChange}
        />
      </div>
      {<p>{errorMsg}</p> ? errorMsg : <></>}

      <button onClick={handleSubmit}>Submit</button>

      {<p>Answer: {ansText}</p> ? ansText : <></>}
    </div>
  );
}
