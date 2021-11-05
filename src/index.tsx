import React, { useEffect, useState } from "react";
import * as esbuild from "esbuild-wasm";
import ReactDOM from "react-dom";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";

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
    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: 'window'
      },
    });
    console.log(result);
    setCode(result.outputFiles[0].text);
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
