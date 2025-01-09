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

addStyles();

export default function SideBar() {
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

    console.log("Inputs submitted");

    console.log(`func: ${func}`);
    console.log(`secondFuncChoice: ${secondFuncChoice}`);
    console.log(`customFunc: ${customFunc}`);
    console.log(`axisOfRotation: ${axisOfRotation}`);
    console.log(`lowerBound: ${lowerBound}`);
    console.log(`upperBound: ${upperBound}`);

    // the below functions will get called in order until a value of true is returned
    // ex. errorInFunc === false, errorInCustomFunc === true, then errorInBounds will not run
    const errorInInput =
      errorInFunc() || errorInCustomFunc() || errorInBounds();

    errorInFunc();
    errorInCustomFunc();
    errorInBounds();

    if (errorInInput) {
      console.warn("There is at least 1 error");
      // don't send to scene component
    }
  }

  function errorInFunc() {
    let errorInInput = false;

    try {
      if (func.length === 0) {
        throw new Error("Field cannot be empty");
      }

      // console.log("simplified:");
      // console.log(
      //   math.simplify(parseTex(func).compile().toString()).toString()
      // );

      console.log("Test:");

      const parsedFunc = parseTex(func);

      // replace all instances of \frac with /
      const transformed = parsedFunc.transform(function (node, path, parent) {
        if (node.isOperatorNode && node.op === "\\frac") {
          console.log("node args");
          console.log(node.args);
          return new math.OperatorNode("/", "divide", node.args);
        } else {
          return node;
        }
      });

      console.log("transformed");
      console.log(transformed);

      console.log("traversing");
      parsedFunc.traverse(function (node, path, parent) {
        switch (node.type) {
          case "OperatorNode":
            console.log(node.type, node.op, node.fn);
            break;
          case "ConstantNode":
            console.log(node.type, node.value);
            break;
          case "SymbolNode":
            console.log(node.type, node.name);
            break;
          default:
            console.log(node.type);
        }

        if (node.type === "OperatorNode" && node.fn === "divide") {
          console.log(
            `numerator: ${node.args[0]} denominator: ${node.args[1]}`
          );
        }
      });

      console.log("indefinite integral of f(x):");

      const funcIndefInt = nerdamer(
        `defint((${nerdamer.convertFromLaTeX(
          func
        )}, ${nerdamer.convertFromLaTeX(
          lowerBound
        )}, ${nerdamer.convertFromLaTeX(upperBound)}, x))`
      );

      console.log(funcIndefInt.toString());

      console.log("fully integrated function:");
      console.log(
        nerdamer(
          `integrate((${nerdamer.convertFromLaTeX(func)}), x)`
        ).toString()
      );

      const evaluated = funcIndefInt.evaluate();
      console.log("evaluated value:");
      console.log(evaluated.toString());
      console.log(evaluated.text("decimals"));

      // check if imaginary
      console.log(
        Number(
          nerdamer(`imagpart(${evaluated.text("decimals")})`).text("decimals")
        ) === 0
      );

      // console.log(transformed.toTex());
      // console.log(math.rationalize(transformed).toTex());

      // console.log("Correct output:");
      // console.log(math.parse("1/x + x^2"));
      // console.log(math.rationalize(math.parse("1/x + x^2")).toTex());

      console.log("-----");

      // console.log(parseTex(func).toString());
      // const simplified = math.simplify(parseTex(func));
      // console.log(simplified);
      // const rationalized = math.rationalize(simplified);
      // console.log(rationalized);

      // const transformed = node.transform(function (node, path, parent) {
      //   // if (node.isSymbolNode && node.name === "x") {
      //   //   return new math.ConstantNode(3);
      //   // }
      //   return node;
      // });
      // console.log(transformed.toString());

      // console.log(parseTex(func).compile().evaluate({ x: 10 }));
    } catch (error) {
      console.error(error);
      setFuncError(error.message);
      errorInInput = true;
    }

    return errorInInput;
  }

  function errorInCustomFunc() {
    let errorInInput = false;

    try {
      if (customFunc.length === 0 && secondFuncChoice === CUSTOM_FUNCTION) {
        throw new Error("Field cannot be empty");
      }
    } catch (error) {
      console.error(error);
      setCustomFuncError(error.message);
      errorInInput = true;
    }

    return errorInInput;
  }

  function errorInBounds() {
    let lowerBoundVal;
    let upperBoundVal;
    let errorInInput = false;

    try {
      if (lowerBound.length === 0) {
        throw new Error("Field cannot be empty");
      }

      lowerBoundVal = parseTex(lowerBound).compile().evaluate();

      if (typeof lowerBoundVal !== "number") {
        throw new Error("Please enter a real number");
      }
    } catch (error) {
      console.error(error);
      setLowerBoundError(error.message);
      errorInInput = true;
      return errorInInput;
    }

    try {
      if (upperBound.length === 0) {
        throw new Error("Field cannot be empty");
      }

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
      errorInInput = true;
    }

    return errorInInput;
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
