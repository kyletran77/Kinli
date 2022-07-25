import "./styles.css";
import Editor from "./Editor";

export default function Resume() {
  return (
    <div className="App">
      <h1>Resume Editor</h1>
      <p>Build your resume here!📝</p>
      <Editor />
      <div className="other">
        
        <ul>
          <li>
            <a
              href="https://docs.google.com"
              target="_blank"
              rel="noreferrer"
            >
              Google Docs
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}