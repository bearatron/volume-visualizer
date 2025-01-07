import "./SideBar.css";
import { useState } from "react";
import { parseTex } from "tex-math-parser";
import * as math from "mathjs";
import { addStyles, StaticMathField, EditableMathField } from "react-mathquill";
import InputGroup from "./InputGroup";
import ErrorContainer from "./ErrorContainer";

addStyles();

export default function SideBar() {
  const [func, setFunc] = useState(""); // latex string (with x as variable)
  const [funcError, setFuncError] = useState("");

  const AXIS_OF_ROTATION = 1;
  const CUSTOM_FUNCTION = 2;
  const [secondFuncChoice, setSecondFuncChoice] = useState(AXIS_OF_ROTATION);

  const [customFunc, setCustomFunc] = useState(""); // latex string (with x as variable)
  const [customFuncError, setCustomFuncError] = useState("");

  const rotationOptions = ["x axis", "y axis"];
  const [axisOfRotation, setAxisOfRotation] = useState(rotationOptions[0]);

  const [lowerBound, setLowerBound] = useState(""); // latex string (no variables)
  const [lowerBoundError, setLowerBoundError] = useState("");
  const [upperBound, setUpperBound] = useState(""); // latex string (no variables)
  const [upperBoundError, setUpperBoundError] = useState("");

  const [varText, setVarText] = useState("");
  const [varError, setVarError] = useState("");
  const [ansText, setAnsText] = useState("");

  function handleSubmit() {
    console.log("submit button pressed!");

    console.log(`func: ${func}`);
    console.log(`secondFuncChoice: ${secondFuncChoice}`);
    console.log(`customFunc: ${customFunc}`);
    console.log(`axisOfRotation: ${axisOfRotation}`);
    console.log(`lowerBound: ${lowerBound}`);
    console.log(`upperBound: ${upperBound}`);

    // const funcNode = parseTex(func);
    // const funcCode = funcNode.compile();

    // const varNode = parseTex(varText);
    // const varCode = varNode.compile();
    // const varValue = varCode.evaluate();

    // console.log(varValue);
    // const mathJSAns = funcCode.evaluate({ x: varValue });

    // setAnsText(mathJSAns.toString());

    validateLowerBound();
  }

  function validateFunc() {}
  function validateSecondFuncChoice() {}
  function validateCustomFunc() {}
  function validateAxisOfRotation() {}
  function validateLowerBound() {
    const lowerBoundNode = parseTex(lowerBound);
    try {
      lowerBoundNode.compile().evaluate();
    } catch (error) {
      console.error("error in lower bound");
      console.log(error.message);
      setLowerBoundError(error.message);
      return;
    }

    const lowerBoundVal = lowerBoundNode.compile().evaluate();
  }
  function validateUpperBound() {
    const lowerBoundNode = parseTex(lowerBound);
    const upperBoundNode = parseTex(upperBound);
    const lowerBoundVal = lowerBoundNode.compile().evaluate();
    const upperBoundVal = upperBoundNode.compile().evaluate();

    // console.log(`lower bound: ${lowerBoundVal}`);
    // console.log(`upper bound: ${upperBoundVal}`);

    // console.log(typeof lowerBoundVal);
    // console.log(upperBound < lowerBound);
    // if (upperBound < lowerBound) {
    //   setUpperBoundError("Upper bound cannot be greater than lower bound");
    // }
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

  function handleRadioButton(e) {
    console.log(e.target.name);

    const option = Number(e.target.name);

    console.log("Rotate around...");

    switch (option) {
      case AXIS_OF_ROTATION:
        console.log("axis of rotation");
        setSecondFuncChoice(AXIS_OF_ROTATION);
        break;
      case CUSTOM_FUNCTION:
        console.log("custom function");
        setSecondFuncChoice(CUSTOM_FUNCTION);
        break;
      default:
        console.log("none");
    }
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

      <div>
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
      </div>

      <div>
        <p>
          Get the area between{" "}
          <span>
            <StaticMathField>{"\\f(x)"}</StaticMathField>
          </span>{" "}
          and ...
        </p>
        <div className="radio-choices">
          <div>
            <input
              type="radio"
              name={AXIS_OF_ROTATION}
              id="axis-of-rotation"
              checked={secondFuncChoice === AXIS_OF_ROTATION}
              onChange={handleRadioButton}
            />
            <label htmlFor="axis-of-rotation">axis of rotation</label>
          </div>
          <div>
            <input
              type="radio"
              name={CUSTOM_FUNCTION}
              id="custom-function"
              checked={secondFuncChoice === CUSTOM_FUNCTION}
              onChange={handleRadioButton}
            />
            <label htmlFor="custom-function">custom function</label>
          </div>

          {secondFuncChoice === CUSTOM_FUNCTION ? (
            <div className="input-group">
              <StaticMathField>{"g(x)\\space=\\space"}</StaticMathField>

              <EditableMathField
                latex={customFunc}
                onChange={(mathField) => {
                  setCustomFunc(mathField.latex());
                }}
              />
            </div>
          ) : (
            <></>
          )}
          <ErrorContainer>{customFuncError}</ErrorContainer>
        </div>
      </div>

      <div>
        <div className="input-group">
          <label htmlFor="rotation-select">Axis of rotation:</label>
          <select
            onChange={(e) => {
              setAxisOfRotation(e.target.value);
            }}
            name="axis"
            id="axis-select"
          >
            {rotationOptions.map((option, idx) => (
              <option key={idx}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <div>
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
        </div>
        <div>
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
        </div>
      </div>

      <hr />
      <div>
        <div className="input-group">
          <StaticMathField>{"x\\space=\\space"}</StaticMathField>
          <EditableMathField
            latex={varText}
            className="math-input"
            onChange={handleVarChange}
          />
        </div>
        <ErrorContainer>{varError}</ErrorContainer>
      </div>
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
