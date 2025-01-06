import "./SideBar.css";
import { useState } from "react";
import { parseTex } from "tex-math-parser";
import * as math from "mathjs";
import { addStyles, StaticMathField, EditableMathField } from "react-mathquill";
import InputGroup from "./InputGroup";
import ErrorContainer from "./ErrorContainer";

addStyles();

export default function SideBar() {
  const [func, setFunc] = useState("");
  const [funcError, setFuncError] = useState("");
  const [lowerBound, setLowerBound] = useState("");
  const [lowerBoundError, setLowerBoundError] = useState("");
  const [upperBound, setUpperBound] = useState("");
  const [upperBoundError, setUpperBoundError] = useState("");
  const [axisOfRotation, setAxisOfRotation] = useState("x");

  const [varText, setVarText] = useState("");
  const [varError, setVarError] = useState("");
  const [ansText, setAnsText] = useState("");

  function handleSubmit() {
    console.log("button pressed!");

    const funcNode = parseTex(func);
    const funcCode = funcNode.compile();

    const varNode = parseTex(varText);
    const varCode = varNode.compile();
    const varValue = varCode.evaluate();

    console.log(varValue);
    const mathJSAns = funcCode.evaluate({ x: varValue });

    setAnsText(mathJSAns.toString());
  }

  function handleVarChange(mathField) {
    setVarText(mathField.latex());

    // const node = parseTex(varText);
    // const code = node.compile();
    // setVarValue(code.evaluate());
    // setVarError("");

    // const val = Number(e.target.value);
    // if (isNaN(val)) {
    //   setVarError("Please enter a number");
    // } else {
    //   setVarValue(val);
    //   setVarError("");
    // }
  }

  return (
    <div className="sidebar">
      <h1>Volume Visualizer</h1>

      {
        //TODO: Refactor
        /* <InputGroup
        labelTexStr="f(x)\\space=\\space"
        varInput={true}
        inputTexStr={func}
        setInputTexStr={setFunc}
        errorText={funcError}
      /> */
      }

      <div className="input-group">
        <StaticMathField className="input-label">
          {"f(x)\\space=\\space"}
        </StaticMathField>
        <EditableMathField
          latex={func}
          className="math-input"
          onChange={(mathField) => {
            setFunc(mathField.latex());
          }}
        />
      </div>
      <ErrorContainer>{funcError}</ErrorContainer>

      <p>
        Get the area between{" "}
        <span>
          <StaticMathField>{"\\f(x)"}</StaticMathField>
        </span>{" "}
        and ...
      </p>
      <div className="radio-choices">
        <div>
          <input type="radio" name="second-graph" id="axis-of-rotation" />
          <label for="axis-of-rotation">axis of rotation</label>
        </div>
        <div>
          <input type="radio" name="second-graph" id="custom-function" />
          <label for="custom-function">custom function</label>
        </div>
        <div className="input-group">
          <StaticMathField>{"g(x)\\space=\\space"}</StaticMathField>

          <EditableMathField latex="" />
        </div>
      </div>

      <div className="input-group">
        <StaticMathField>{"x_0\\space=\\space"}</StaticMathField>
        <EditableMathField
          latex={lowerBound}
          className="math-input"
          onChange={(mathField) => {
            setLowerBound(mathField.latex());
          }}
        />
      </div>
      <ErrorContainer>{lowerBoundError}</ErrorContainer>
      <div className="input-group">
        <StaticMathField>{"x_1\\space=\\space"}</StaticMathField>
        <EditableMathField
          latex={upperBound}
          className="math-input"
          onChange={(mathField) => {
            setUpperBound(mathField.latex());
          }}
        />
      </div>
      <ErrorContainer>{upperBoundError}</ErrorContainer>
      <hr />
      <div className="input-group">
        <StaticMathField>{"x\\space=\\space"}</StaticMathField>
        <EditableMathField
          latex={varText}
          className="math-input"
          onChange={handleVarChange}
        />
      </div>
      <ErrorContainer>{varError}</ErrorContainer>
      {/* <div className="input-group">
        <p>x:</p>
        <input
          type="text"
          name="equationInput"
          id="equation-input"
          onChange={handleVarChange}
        />
      </div>
      {<p>{varError}</p> ? varError : <></>} */}
      <button onClick={handleSubmit}>Submit</button>
      {<p>Answer: {ansText}</p> ? ansText : <></>}
    </div>
  );
}
