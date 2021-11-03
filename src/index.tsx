import React, { useEffect, useState } from "react";
import * as esbuild from "esbuild-wasm";
import ReactDOM from "react-dom";

const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const startService = async () => {
    await esbuild.initialize({
      worker: true,
      wasmURL: "/esbuild.wasm",
    });
    console.log();
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    const res = await esbuild.transform(input, {
      loader: "jsx",
      target: "es2015",
    });
    console.log(res);
    setCode(res.code);
  };

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
