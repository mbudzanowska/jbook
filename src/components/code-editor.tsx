import Editor from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange }) => {
  const onEditorChange = (code: string | undefined) => {
    onChange(code || "");
  };

  const onFormatClick = () => {
    const formattedCode = prettier.format(value, {
      parser: "babel",
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true,
    });
    onChange(formattedCode);
  };

  return (
    <div>
      <button onClick={onFormatClick}>Format</button>
      <Editor
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
