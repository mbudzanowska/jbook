import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { store } from "./state";
import { Provider } from "react-redux";
import CellList from "./components/cell-list";
import { initialize } from "./bundler";
// import CodeCell from "./components/code-cell";
// import TextEditor from "./components/text-editor";

const App = () => {
  useEffect(() => {
    const init = async ( )=> {
      await initialize();
    }
    init();
  }, []);

  return (
    <Provider store={store}>
      <div>
        {/* <CodeCell /> */}
        {/* <TextEditor /> */}
        <CellList />
      </div>
    </Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
