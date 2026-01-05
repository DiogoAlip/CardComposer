import {useDroppable} from '@dnd-kit/core';

interface DroppableProps {
    id: string;
    children: React.ReactNode;
    className?: string;
}

export function Droppable(props: DroppableProps) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });

  return (
    <div
        ref={setNodeRef}
        className={`p-4 rounded-lg w-full h-fit min-h-[56px] ${isOver ? "bg-primary" : "bg-white/10"} ${props.className}`}
    >
      {props.children}
    </div>
  );
}
  