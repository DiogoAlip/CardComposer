import { X } from "lucide-react";

interface DroppableButtonProps {
    instanceId: string;
    paragraph: string;
    handleRemoveBlock: () => void;
}

export const DroppableButton = ({instanceId, paragraph, handleRemoveBlock}: DroppableButtonProps) => {
    return (
        <div 
            key={instanceId} 
            className="px-3 py-2 flex items-center justify-between bg-secondary/20 border border-secondary rounded shadow-sm text-white"
        >
            <p className="text-sm">{paragraph}</p>
            <X className="w-4 h-4" onClick={handleRemoveBlock}/>
        </div>
    )
}