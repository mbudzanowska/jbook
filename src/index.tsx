import "bulmaswatch/superhero/bulmaswatch.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { store } from "./state";
import { Provider } from "react-redux";
import CellList from "./components/cell-list";
// import CodeCell from "./components/code-cell";
// import TextEditor from "./components/text-editor";

const App = () => {
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
