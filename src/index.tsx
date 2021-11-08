import "bulmaswatch/superhero/bulmaswatch.min.css";
import bundle from "./bundler";
import React, { useState } from "react";
import ReactDOM from "react-dom";

import CodeEditor from "./components/code-editor";
import Preview from "./components/preview";

const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState<string>("");

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <div>
      <CodeEditor value={input} onChange={(value) => setInput(value)} />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
