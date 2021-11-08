import "./code-editor.css";
import "./syntax.css";
import Editor, { OnMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import Highlighter from "monaco-jsx-highlighter";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange }) => {
  const onEditorChange = (code: string | undefined) => {
    onChange(code || "");
  };

  const onFormatClick = () => {
    const formattedCode = prettier
      .format(value, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, "");
    onChange(formattedCode);
  };

  const bulmaParse = (code: string) =>
    parse(code, {
      sourceType: "module",
      plugins: ["jsx"],
    });

  const onEditorDidMount: OnMount = (editor) => {
    const highlighter = new Highlighter(
      //@ts-ignore
      window.monaco,
      bulmaParse,
      traverse,
      editor
    );
    highlighter.highLightOnDidChangeModelContent(100);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-samll"
        onClick={onFormatClick}
      >
        Format
      </button>
      <Editor
        onMount={onEditorDidMount}
        onChange={onEditorChange}
        defaultValue=""
        value={value}
        height="500px"
        language="javascript"
        theme="vs-dark"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          tabCompletion: "on",
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default CodeEditor;
