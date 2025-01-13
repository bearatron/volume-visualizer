import "./SideBar.css";
import { useState } from "react";
import { parseTex } from "tex-math-parser";
import * as math from "mathjs";
import { addStyles, StaticMathField, EditableMathField } from "react-mathquill";
import ErrorContainer from "./ErrorContainer";
import nerdamer from "nerdamer/nerdamer.core.js";
import "nerdamer/Algebra.js";
import "nerdamer/Calculus.js";
import "nerdamer/Solve.js";
import { XAXIS, YAXIS } from "./threejsComponents/utils";

addStyles();

export default function SideBar({
  setF,
  setG,
  setMin,
  setMax,
  setGlobalRotationAxis,
}) {
  const mathquillConfig = {
    spaceBehavesLikeTab: true,
    maxDepth: 5,
    // autoCommands causes an error for some reason
    // autoCommands: "pi, sqrt",
  };

  const [func, setFunc] = useState(""); // latex string (with x as variable)
  const [funcError, setFuncError] = useState("");

  const AXIS_OF_ROTATION = 1;
  const CUSTOM_FUNCTION = 2;
  const [secondFuncChoice, setSecondFuncChoice] = useState(AXIS_OF_ROTATION);

  const [customFunc, setCustomFunc] = useState(""); // latex string (with x as variable)
  const [customFuncError, setCustomFuncError] = useState("");

  const axisOfRotationOptions = ["x axis", "y axis"];
  const [axisOfRotation, setAxisOfRotation] = useState(
    axisOfRotationOptions[0]
  );

  const [lowerBound, setLowerBound] = useState(""); // latex string (no variables)
  const [lowerBoundError, setLowerBoundError] = useState("");
  const [upperBound, setUpperBound] = useState(""); // latex string (no variables)
  const [upperBoundError, setUpperBoundError] = useState("");

  function handleSubmit() {
    setFuncError("");
    setCustomFuncError("");
    setLowerBoundError("");
    setUpperBoundError("");

    console.log("--- Inputs submitted ---");

    console.log(`func: ${func}`);
    console.log(`secondFuncChoice: ${secondFuncChoice}`);
    console.log(`customFunc: ${customFunc}`);
    console.log(`axisOfRotation: ${axisOfRotation}`);
    console.log(`lowerBound: ${lowerBound}`);
    console.log(`upperBound: ${upperBound}`);
    console.log("--- End of input log ---");

    let inputErrors = [];

    inputErrors.push(
      errorInFunc(),
      secondFuncChoice === CUSTOM_FUNCTION ? errorInCustomFunc() : false,
      errorInBounds()
    );

    for (const i of inputErrors) {
      console.log(i);
      if (i) {
        return;
      }
    }

    inputErrors.push(hasInvalidFunction(func));

    if (secondFuncChoice === CUSTOM_FUNCTION) {
      inputErrors.push(hasInvalidFunction(customFunc));
    }

    for (const i of inputErrors) {
      if (i) {
        return;
      }
    }

    inputErrors.push(!isIntegrable(func));
    if (secondFuncChoice === CUSTOM_FUNCTION) {
      inputErrors.push(!isIntegrable(customFunc));
    }

    for (const i of inputErrors) {
      if (i) {
        return;
      }
    }

    // check if all elements are false
    console.warn("There are no errors!");

    setF(
      () => (x) =>
        Number(
          nerdamer(nerdamer.convertFromLaTeX(func), { x: x })
            .evaluate()
            .toDecimal()
        )
    );
    setG(
      () => (x) =>
        secondFuncChoice === CUSTOM_FUNCTION
          ? Number(
              nerdamer(nerdamer.convertFromLaTeX(customFunc), { x: x })
                .evaluate()
                .toDecimal()
            )
          : 0
    );

    // setF(
    //   () => (x) =>
    //     math.number(
    //       parseTex(func)
    //         .compile()
    //         .evaluate({ x: math.number(math.round(x, 10)) })
    //     )
    // );
    // setG(
    //   () => (x) =>
    //     secondFuncChoice === CUSTOM_FUNCTION
    //       ? math.number(
    //           parseTex(customFunc)
    //             .compile()
    //             .evaluate({ x: math.number(math.round(x, 10)) })
    //         )
    //       : 0
    // );

    // Number(nerdamer.convertFromLaTeX(upperBound).evaluate().text("decimals"))

    setMin(parseTex(lowerBound).compile().evaluate());
    setMax(parseTex(upperBound).compile().evaluate());
    setGlobalRotationAxis(axisOfRotation === "x axis" ? XAXIS : YAXIS);
  }

  function isEmpty(inputToCheck, setInputError) {
    if (inputToCheck.length === 0) {
      console.error("Empty field");
      setInputError("Field cannot be empty");
      return true;
    }
    return false;
  }

  function hasInvalidLatex(inputToCheck, setInputError, allowX = false) {
    // matches a character that is NOT one of the following:
    // digits, whitespace, math related chars listed below:
    // e + - * / ^ ( ) [ ] { } _ . : , \
    let regex;

    if (allowX) {
      regex = /[^xe0-9\s+\-*\/^()=\[\]\{\}_.:,\\]/; // allow x
    } else {
      regex = /[^e0-9\s+\-*\/^()=\[\]\{\}_.:,\\]/;
    }

    if (regex.test(inputToCheck)) {
      setInputError(`Invalid character "${regex.exec(inputToCheck)}"`);
      console.error("Invalid characters in input");
      return true;
    }

    return false;
  }

  function errorInFunc() {
    if (isEmpty(func, setFuncError)) {
      return true;
    }

    if (hasInvalidLatex(func, setFuncError, true)) {
      return true;
    }

    return false;
  }

  function errorInCustomFunc() {
    if (isEmpty(customFunc, setCustomFuncError)) {
      return true;
    }

    if (hasInvalidLatex(customFunc, setCustomFuncError, true)) {
      return true;
    }

    return false;
  }

  function errorInBounds() {
    if (
      isEmpty(lowerBound, setLowerBoundError) ||
      isEmpty(upperBound, setUpperBoundError)
    ) {
      return true;
    }

    if (
      hasInvalidLatex(lowerBound, setLowerBoundError) ||
      hasInvalidLatex(upperBound, setUpperBoundError)
    ) {
      return true;
    }

    let lowerBoundVal;
    let upperBoundVal;

    try {
      lowerBoundVal = parseTex(lowerBound).compile().evaluate();

      if (typeof lowerBoundVal !== "number") {
        throw new Error("Please enter a real number");
      }
    } catch (error) {
      console.error(error.message);
      setLowerBoundError(error.message);
      return true;
    }

    try {
      upperBoundVal = parseTex(upperBound).compile().evaluate();

      if (typeof lowerBoundVal !== "number") {
        throw new Error("Please enter a real number");
      }

      if (upperBoundVal < lowerBoundVal) {
        throw new Error("Upper bound cannot be less than lower bound");
      }

      if (upperBoundVal === lowerBoundVal) {
        throw new Error("Upper and lower bounds cannot be equal");
      }
    } catch (error) {
      console.error(error);
      setUpperBoundError(error.message);
      return true;
    }

    return false;
  }

  function hasInvalidFunction(funcToCheck) {
    const setErrorMsg =
      funcToCheck === func ? setFuncError : setCustomFuncError;

    if (funcToCheck.includes("log_")) {
      setErrorMsg(
        "Instead of using a single log, convert to a fraction of two logs"
      );
      return true;
    }

    return false;
  }

  function isIntegrable(funcToCheck) {
    const setErrorMsg =
      funcToCheck === func ? setFuncError : setCustomFuncError;

    // funcToCheck should be a latex string

    const funcDefInt = nerdamer(
      `defint(${nerdamer.convertFromLaTeX(
        funcToCheck
      )}, ${nerdamer.convertFromLaTeX(lowerBound)}, ${nerdamer.convertFromLaTeX(
        upperBound
      )}, x)`
    );

    console.log(
      `definite integral of ${nerdamer.convertFromLaTeX(
        funcToCheck
      )} from ${nerdamer.convertFromLaTeX(
        lowerBound
      )} to ${nerdamer.convertFromLaTeX(upperBound)} is ${funcDefInt}`
    );

    // evaluate returns an value in fraction form, this converts it to decimals
    const funcDefIntDecimal = funcDefInt.evaluate().text("decimals");

    console.log(`decimal form: ${funcDefIntDecimal}`);

    const imaginaryPart = Number(
      nerdamer(`imagpart(${funcDefIntDecimal})`).text("decimals")
    );

    console.log(`imaginary part: ${imaginaryPart}`);

    // if the indefinite integral has an imaginary part, there is at least one restriction within the bounds
    // therefore, if the indefinite integral's imaginary part is 0, the function the user inputted is integrable
    let funcIsValid = imaginaryPart === 0;

    if (!funcIsValid) {
      setErrorMsg("Function is not integrable within that range");
      return funcIsValid;
    }

    try {
      const funcAtLowerBound = nerdamer(
        nerdamer.convertFromLaTeX(funcToCheck),
        {
          x: nerdamer.convertFromLaTeX(lowerBound),
        }
      );
      const funcAtUpperBound = nerdamer(
        nerdamer.convertFromLaTeX(funcToCheck),
        {
          x: nerdamer.convertFromLaTeX(upperBound),
        }
      );
      console.log(
        `${funcAtLowerBound.text()} = ${funcAtLowerBound
          .evaluate()
          .text("decimals")}`
      );
      console.log(
        `${funcAtUpperBound.text()} = ${funcAtUpperBound
          .evaluate()
          .text("decimals")}`
      );

      if (
        isNaN(Number(funcAtLowerBound.evaluate().text("decimals"))) ||
        isNaN(Number(funcAtUpperBound.evaluate().text("decimals")))
      ) {
        throw new Error("Function cannot be evaluated");
      }

      // Number(
      //   nerdamer(nerdamer.convertFromLaTeX(func), {
      //     x: nerdamer.convertFromLaTeX(lowerBound),
      //   })
      //     .evaluate()
      //     .toDecimal()
      // );
    } catch (error) {
      console.error(error.message);
      if (error.message === "Function cannot be evaluated") {
        setErrorMsg(error.message);
      } else {
        setErrorMsg("Function is not integrable within that range");
      }
      funcIsValid = false;
    }

    if (!funcIsValid) {
      if (funcToCheck === func) {
        console.log("f is invalid");
      }
      if (funcToCheck === customFunc) {
        console.log("g is invalid");
      }
    }
    return funcIsValid;
  }

  function handleRadioButton(e) {
    console.log(e.target.name);

    const option = Number(e.target.name);

    switch (option) {
      case AXIS_OF_ROTATION:
        setSecondFuncChoice(AXIS_OF_ROTATION);
        break;
      case CUSTOM_FUNCTION:
        setSecondFuncChoice(CUSTOM_FUNCTION);
        break;
      default:
        // should not be possible to reach here
        break;
    }
  }

  return (
    <div className="sidebar">
      <h1>Volume Visualizer</h1>

      <div>
        <div className="input-group">
          <StaticMathField>{"f(x)\\space=\\space"}</StaticMathField>
          <EditableMathField
            config={mathquillConfig}
            latex={func}
            className="math-input"
            onChange={(mathField) => {
              setFunc(mathField.latex());
            }}
          />
        </div>
        <ErrorContainer message={funcError} />
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
            <>
              <div className="input-group">
                <StaticMathField>{"g(x)\\space=\\space"}</StaticMathField>

                <EditableMathField
                  config={mathquillConfig}
                  latex={customFunc}
                  className="math-input"
                  onChange={(mathField) => {
                    setCustomFunc(mathField.latex());
                  }}
                />
              </div>
              <ErrorContainer message={customFuncError} />
            </>
          ) : (
            <></>
          )}
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
            {axisOfRotationOptions.map((option, idx) => (
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
              config={mathquillConfig}
              latex={lowerBound}
              className="math-input"
              onChange={(mathField) => {
                setLowerBound(mathField.latex());
              }}
            />
          </div>
          <ErrorContainer message={lowerBoundError} />
        </div>
        <div>
          <div className="input-group">
            <StaticMathField>{"x_1\\space=\\space"}</StaticMathField>
            <EditableMathField
              config={mathquillConfig}
              latex={upperBound}
              className="math-input"
              onChange={(mathField) => {
                setUpperBound(mathField.latex());
              }}
            />
          </div>
          <ErrorContainer message={upperBoundError} />
        </div>
      </div>

      <button onClick={handleSubmit}>Visualize</button>
    </div>
  );
}
