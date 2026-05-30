import { SquareChevronLeft, SquareChevronRight, X } from "lucide-react";

interface StageNavigatorProps {
  onPrev: () => void;
  onNext: () => void;
  onFinish: () => void;
  isLastStage: boolean;
}

export function StageNavigator({
  onPrev,
  onNext,
  onFinish,
  isLastStage,
}: StageNavigatorProps) {
  return (
    <div className="absolute flex gap-2 right-8 top-3.5">
      <SquareChevronLeft
        onClick={onPrev}
        className="hover:text-primary text-primary/70 w-7.5 h-7.5 cursor-pointer"
      />
      {isLastStage ? (
        <X
          onClick={onFinish}
          className="hover:text-primary text-primary/70 w-7.5 h-7.5 cursor-pointer"
        />
      ) : (
        <SquareChevronRight
          onClick={onNext}
          className="hover:text-primary text-primary/70 w-7.5 h-7.5 cursor-pointer"
        />
      )}
    </div>
  );
}
