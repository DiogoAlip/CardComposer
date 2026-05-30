import { Trash, Play, SendHorizonal } from "lucide-react";
import { Button } from "@/shared/ui/button";

interface CodeActionsProps {
  onClear: () => void;
  onRun: () => void;
  onSend: () => void;
  show: boolean;
}

export function CodeActions({ onClear, onRun, onSend, show }: CodeActionsProps) {
  if (!show) return null;

  return (
    <div className="flex flex-row gap-4">
      <Button
        onClick={onClear}
        className="text-xs border text-red-400 bg-transparent hover:text-black hover:bg-red-400 border-red-400 rounded px-2 py-1"
      >
        <Trash />
        <p className="text-sm">Clear</p>
      </Button>
      <Button
        onClick={onRun}
        className="text-xs border text-green-400 bg-transparent hover:text-black hover:bg-green-400 border-green-400 rounded px-2 py-1"
      >
        <Play />
        <p className="text-sm">Run</p>
      </Button>
      <Button
        className="text-xs border text-cyan-500 bg-transparent hover:text-black hover:bg-cyan-500 border-cyan-500 rounded px-2 py-1"
        onClick={onSend}
      >
        <SendHorizonal />
        <p className="text-sm">Send</p>
      </Button>
    </div>
  );
}
