import { useEffect, useState } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import bundle from "../bundler";
import Resizable from "./resizable";
import { Cell } from "../state";
import {useActions} from "../hooks/useActions"

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({cell}) => {
  const [err, setErr] = useState("");
  const [code, setCode] = useState<string>("");

  const {updateCell } = useActions();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const {code, err} = await bundle(cell.content);
      setCode(code);
      setErr(err);
    }, 750);
    
    return () => {
      clearTimeout(timer);
    }
  }, [cell.content]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: 'calc(100% - 10px)', display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor value={cell.content} onChange={(value) => updateCell(cell.id, value)} />
        </Resizable>
        <Preview err={err} code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
