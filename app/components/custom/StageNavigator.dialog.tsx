import { SquareChevronLeft, SquareChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";

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
    <div className="absolute flex gap-2 right-8">
      <SquareChevronLeft
        onClick={onPrev}
        className="hover:text-primary text-primary/70 w-[30px] h-[30px] cursor-pointer"
      />
      {isLastStage ? (
        <Button
          onClick={onFinish}
          className="bg-background hover:bg-background hover:border-primary border-primary/70 hover:text-primary text-primary/70 h-[30px]"
        >
          Finish Review
        </Button>
      ) : (
        <SquareChevronRight
          onClick={onNext}
          className="hover:text-primary text-primary/70 w-[30px] h-[30px] cursor-pointer"
        />
      )}
    </div>
  );
}
