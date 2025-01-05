import { addStyles, StaticMathField, EditableMathField } from "react-mathquill";
import "./InputGroup.css";

addStyles();

export default function InputGroup({
  labelTexStr,
  varInput,
  inputTexStr,
  setInputTexStr,
  errorText,
}) {
  return (
    <>
      <div className="input-group">
        <StaticMathField className="input-label">{labelTexStr}</StaticMathField>
        <EditableMathField
          latex={inputTexStr}
          className="math-input"
          onChange={(mathField) => {
            setInputTexStr(mathField.latex());
          }}
        />
      </div>

      {<div className="error-container">{errorText}</div> ? errorText : <></>}
    </>
  );
}
