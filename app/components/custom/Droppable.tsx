import {useDroppable} from '@dnd-kit/core';

export function Droppable(props: {id: string, children: React.ReactNode}) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });

  return (
    <div
        ref={setNodeRef}
        className={`p-4 rounded-lg w-full h-fit min-h-[56px] ${isOver ? "bg-primary" : "bg-white/10"}`}
    >
      {props.children}
    </div>
  );
}
  