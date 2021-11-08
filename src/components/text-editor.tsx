import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";

const TextEditor: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState<string | undefined>("**Hello world!!!**");

  useEffect(() => {
    const listener = () => {
      setEditing(false);
    };
    document.addEventListener("click", listener, { capture: true });
    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div>
        <MDEditor value={value} onChange={setValue} />
      </div>
    );
  }

  return (
    <div onClick={() => setEditing(true)}>
      <MDEditor.Markdown source={value} />
    </div>
  );
};

export default TextEditor;
