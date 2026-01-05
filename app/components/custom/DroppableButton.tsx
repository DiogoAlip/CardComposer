interface DroppableButtonProps {
    instanceId: string;
    paragraph: string;
}

export const DroppableButton = ({instanceId, paragraph}: DroppableButtonProps) => {
    return (
        <div 
            key={instanceId} 
            className="p-3 bg-secondary/20 border border-secondary rounded shadow-sm text-white"
        >
            {paragraph}
        </div>
    )
}