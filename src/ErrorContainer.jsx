import "./ErrorContainer.css";

export default function ErrorContainer({ content }) {
  if (content) {
    return <div className="error-container">{content}</div>;
  } else {
    return <></>;
  }
}
