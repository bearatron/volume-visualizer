import "./Fallback.css";
import { MdError } from "react-icons/md";

export default function Fallback() {
  return (
    <div className="fallback-container">
      <div className="error-text">
        <MdError />
        Uh oh, something went wrong. Reload the page to try again.
      </div>
    </div>
  );
}
