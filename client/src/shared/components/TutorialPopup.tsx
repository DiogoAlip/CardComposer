import { use } from "react";
import { GameSettingsContext } from "~/match/context/GameSettings.context";

interface TutorialPopupProps {
  stage: number;
}

const STAGE_DATA: Record<
  number,
  {
    title: string;
    badge: string;
    headerRight: string;
    body: React.ReactNode;
    positionClass: string;
    animateClass: string;
    isCentered?: boolean;
  }
> = {
  0: {
    title: "¡Bienvenido a CardComposer!",
    badge: "Introducción",
    headerRight: "Tutorial de CardComposer",
    body: (
      <>
        Un juego de lógica y programación funcional. Tu objetivo es{" "}
        <strong className="text-primary">
          componer secuencias de funciones
        </strong>{" "}
        que manipulen tus cartas para obtener{" "}
        <strong className="text-primary">el mayor puntaje</strong> frente a tu
        oponente.
      </>
    ),
    positionClass:
      "fixed inset-0 bg-black/50 backdrop-blur-[2px] z-50 flex items-center justify-center pointer-events-auto",
    animateClass: "animate-in zoom-in-95 duration-200",
    isCentered: true,
  },
  1: {
    title: "1. Selección de Funciones",
    badge: "Paso 1 de 4",
    headerRight: "Espacio de Trabajo",
    body: (
      <>
        <p className="mb-1">
          Despliega los acordeones haciendo click a las flechas para seleccionar
          tus funciones.
        </p>
        <p>
          Las <strong className="text-cyan-500">Map Functions</strong> altera la
          fila superior de tus cartas.
        </p>
        <p className="mb-1">
          Las <strong className="text-emerald-500">Filter Functions</strong>{" "}
          seleccionan las cartas con las que deseas quedarte.
        </p>
      </>
    ),
    positionClass: "fixed top-24 left-[390px] w-80",
    animateClass: "animate-in slide-in-from-left-5 duration-300",
  },
  2: {
    title: "2. Ejecutar y Enviar Código",
    badge: "Paso 2 de 4",
    headerRight: "Acciones de Código",
    body: (
      <>
        <p className="mb-1">
          Al elegir funciones, aparecerán los botones de acción en la parte
          superior:
        </p>
        <p>
          • <strong className="text-red-500">Clear</strong>: Reinicia la
          selección de funciones.
        </p>
        <p className="mb-1">
          • <strong className="text-emerald-500">Run</strong>: Previsualiza
          localmente el efecto sobre tus cartas.
        </p>
        <p className="mb-1">
          • <strong className="text-primary">Match</strong>: Inicia el match
          contra el oponente.
        </p>
      </>
    ),
    positionClass: "fixed top-24 left-[390px] w-80",
    animateClass: "animate-in slide-in-from-left-5 duration-300",
  },
  3: {
    title: "3. Cartas del Oponente (Arriba)",
    badge: "Paso 3 de 4",
    headerRight: "Oponente",
    body: "Esta es la baraja del oponente (Bot). Sus cartas también se modificarán por sus funciones programadas. Al final de la ronda, se comparan las cartas correspondientes que queden boca arriba.",
    positionClass: "fixed top-24 right-8 w-80",
    animateClass: "animate-in slide-in-from-right-5 duration-300",
  },
  4: {
    title: "4. Tu Zona de Juego",
    badge: "Paso 4 de 4",
    headerRight: "Jugador",
    body: (
      <>
        Esta es tu baraja con 4 cuatro cartas para la fila frontal, tu objetivo
        es{" "}
        <strong className="text-primary">
          ordenar tus cartas para obtener el mayor puntaje
        </strong>{" "}
        delante de tu oponente.{" "}
        <strong className="text-primary">Cada fila se compara</strong> y ganara
        el puntaje mas alto,{" "}
        <strong className="text-primary">los puntos obtenidos se suman </strong>{" "}
        y el jugador con mayor puntaje gana la partida.
      </>
    ),
    positionClass: "fixed bottom-24 right-8 w-80",
    animateClass: "animate-in slide-in-from-right-5 duration-300",
  },
};

export function TutorialPopup({ stage }: TutorialPopupProps) {
  const { tutorialMode, tutorialStage, setTutorialMode, setTutorialStage } =
    use(GameSettingsContext);

  if (!tutorialMode || tutorialStage !== stage) return null;

  const data = STAGE_DATA[stage];
  if (!data) return null;

  if (data.isCentered) {
    return (
      <div className={data.positionClass}>
        <div
          className={`w-full max-w-md bg-zinc-900/95 border border-zinc-800 p-6 rounded-2xl shadow-2xl flex flex-col gap-4 text-zinc-100 ${data.animateClass}`}
        >
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              {data.badge}
            </span>
            <span className="text-xs text-zinc-500 font-medium">
              {data.headerRight}
            </span>
          </div>
          <div>
            <h4 className="text-lg font-bold text-zinc-100 mb-1">
              {data.title}
            </h4>
            <p className="text-sm text-zinc-400 leading-relaxed">{data.body}</p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <button
              onClick={() => setTutorialMode(false)}
              className="px-3 py-1.5 rounded-lg border border-zinc-800 text-sm font-medium hover:bg-zinc-800 transition-colors cursor-pointer text-zinc-300"
            >
              Omitir
            </button>
            <button
              onClick={() => setTutorialStage(1)}
              className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors cursor-pointer shadow-md shadow-emerald-900/35"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${data.positionClass} bg-zinc-900/95 border border-zinc-800 p-5 rounded-2xl shadow-2xl z-50 text-zinc-100 flex flex-col gap-3 backdrop-blur-md pointer-events-auto ${data.animateClass}`}
    >
      <div className="flex justify-between items-center border-b border-zinc-800 pb-1.5">
        <span className="text-xs font-bold uppercase text-emerald-400">
          {data.badge}
        </span>
        <span className="text-xs text-zinc-500 font-medium">
          {data.headerRight}
        </span>
      </div>
      <div>
        <h4 className="text-sm font-bold text-zinc-100 mb-1">{data.title}</h4>
        <div className="text-xs text-zinc-400 leading-relaxed">{data.body}</div>
      </div>
      <div className="flex justify-between items-center mt-1">
        <button
          onClick={() => setTutorialStage(stage - 1)}
          className="px-2 py-1 rounded border border-zinc-800 text-xs font-medium hover:bg-zinc-800 text-zinc-300 cursor-pointer"
        >
          Anterior
        </button>
        {stage === 4 ? (
          <button
            onClick={() => setTutorialMode(false)}
            className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors cursor-pointer"
          >
            Finalizar
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => setTutorialMode(false)}
              className="px-2 py-1 rounded border border-zinc-800 text-xs font-medium hover:bg-zinc-800 text-zinc-300 cursor-pointer"
            >
              Omitir
            </button>
            <button
              onClick={() => setTutorialStage(stage + 1)}
              className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors cursor-pointer"
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
