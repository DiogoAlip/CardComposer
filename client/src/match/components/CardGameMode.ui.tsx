import { Card } from "~/shared/ui/card";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import type { LucideProps } from "lucide-react";
import { X } from "lucide-react";
import { Button } from "~/shared/ui/button";

interface GameMode {
  mode: {
    id: string;
    title: string;
    description: string;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    avaible: boolean;
  };
  gameModeSelected: string;
  handleGameMode: (gameModeId: string) => () => void;
  cancelGameMode: () => void;
  children?: React.ReactNode;
}

export const CardGameMode = ({
  mode,
  gameModeSelected,
  handleGameMode,
  cancelGameMode,
  children,
}: GameMode) => {
  return (
    <>
      <Card
        className={`p-8 h-full border-2 transition-all duration-300 
          ${
            gameModeSelected.length
              ? "border-primary bg-linear-to-br from-[#FAD126] to-[#FF564E]"
              : "cursor-pointer hover:border-[#FFD428] hover:bg-white/10 border-white/10 bg-white/5"
          } 
          ${mode.avaible ? "" : "pointer-events-none opacity-50"}
          `}
        onClick={
          !!gameModeSelected.length || !mode.avaible
            ? undefined
            : handleGameMode(mode.id)
        }
        key={mode.id}
      >
        <div className="flex flex-col h-full justify-center items-center">
          <div
            className={`mb-6 p-4 rounded-full w-fit transition-all duration-300
              ${
                gameModeSelected.length
                  ? "bg-black/50"
                  : "bg-linear-to-br from-[#FAD126] to-[#FF564E]"
              }`}
          >
            <mode.icon className="h-8 w-8 text-white" />
          </div>

          <h3 className="text-2xl font-bold mb-3 text-center text-white">
            {mode.title}
          </h3>
          <p
            className={`text-sm mb-6 flex-1 text-center
                ${gameModeSelected.length ? "text-white" : "text-white/60"}`}
          >
            {mode.avaible ? mode.description : "En proximas actualizaciones..."}
          </p>

          {!!gameModeSelected.length && (
            <div className="flex flex-col justify-center gap-2">
              {children}
              <Button
                className="bg-transparent text-white border-primary hover:bg-transparent hover:transform-[translateX(-8px)]"
                onClick={cancelGameMode}
              >
                Cancelar
                <span>
                  <X className="h-4 w-4" />
                </span>
              </Button>
            </div>
          )}
        </div>
      </Card>
    </>
  );
};

