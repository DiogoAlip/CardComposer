import { Tooltip } from "react-tooltip";
import { Trash, Play, HandFist } from "lucide-react";
import { Button } from "@/shared/ui/button";

interface CodeActionsProps {
  onClear: () => void;
  onRun: () => void;
  onSend: () => void;
  show: boolean;
}

export function CodeActions({
  onClear,
  onRun,
  onSend,
  show,
}: CodeActionsProps) {
  if (!show) return null;

  return (
    <div className="flex flex-row gap-4">
      <Tooltip id="code-operations" />
      <Button
        onClick={onClear}
        className="text-xs border text-red-400 bg-transparent hover:text-black hover:bg-red-400 border-red-400 rounded px-2 py-1"
        data-tooltip-id="code-operations"
        data-tooltip-content="Limpiar codigo"
        data-tooltip-place="bottom"
      >
        <Trash />
        <p className="text-sm">Clear</p>
      </Button>
      <Button
        onClick={onRun}
        className="text-xs border text-green-400 bg-transparent hover:text-black hover:bg-green-400 border-green-400 rounded px-2 py-1"
        data-tooltip-id="code-operations"
        data-tooltip-content="Ejecutar codigo"
        data-tooltip-place="bottom"
      >
        <Play />
        <p className="text-sm">Run</p>
      </Button>
      <Button
        className="text-xs border text-primary bg-transparent hover:text-black hover:bg-primary border-primary rounded px-2 py-1"
        onClick={onSend}
        data-tooltip-id="code-operations"
        data-tooltip-content="Iniciar Match"
        data-tooltip-place="bottom"
      >
        <HandFist />
        <p className="text-sm">Match</p>
      </Button>
    </div>
  );
}
