import "./ErrorContainer.css";

export default function ErrorContainer({ message }) {
  if (message) {
    return <div className="error-container">{message}</div>;
  } else {
    return <></>;
  }
}
