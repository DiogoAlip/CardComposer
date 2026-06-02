import { Link } from "react-router";
import { Gamepad2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border pt-12 pb-8 bg-white/5 px-6 md:px-0">
      <div className="container mx-auto max-w-6xl">
        {/* SECCIÓN PRINCIPAL: Distribución en Columnas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 items-start px-12">
          {/* Columna 1: Branding y Eslogan */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
            <Link
              to="/"
              className="flex items-center gap-2 font-bold text-3xl text-white hover:opacity-90 transition-opacity"
            >
              <Gamepad2 className="h-9 w-9 text-primary" />
              <span>CardComposer</span>
            </Link>
            <p className="text-sm text-white/60 max-w-sm">
              Aprende programación funcional jugando con cartas.
            </p>
          </div>

          {/* Columna 2: Navegación del Serious Game */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <h4 className="text-sm font-semibold text-primary tracking-wider">
              Módulo de Juego
            </h4>
            <ul className="flex flex-col gap-2 items-center md:items-start text-sm text-white/70">
              <li>
                <Link to="/play" className="hover:text-white transition-colors">
                  Jugar Ahora
                </Link>
              </li>
              <li>
                <Link
                  to="/rules"
                  className="hover:text-white transition-colors"
                >
                  Tutorial de Reglas
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Navegación Académica / Teórica */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <h4 className="text-sm font-semibold text-primary tracking-wider">
              Aprendizaje FP
            </h4>
            <ul className="flex flex-col gap-2 items-center md:items-start text-sm text-white/70">
              <li>
                <Link
                  to="/concepts"
                  className="hover:text-white transition-colors"
                >
                  Conceptos de Programación
                </Link>
              </li>
              <li>
                <Link
                  to="https://github.com/DiogoAlip/CardComposer"
                  target="_blank"
                  className="hover:text-white transition-colors"
                >
                  Documentación del Proyecto
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* LÍNEA INFERIOR: Créditos y Repositorio */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 px-12">
          <p className="text-xs text-white/50">
            © 2026 CardComposer version Beta
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="https://github.com/DiogoAlip/CardComposer"
              className="text-white/50 hover:text-white transition-colors flex items-center gap-2 text-xs"
              target="_blank"
            >
              <span>Ver en GitHub</span>
              <img
                src="/github.svg"
                alt="GitHub"
                className="invert scale-110 h-5 w-5 border-0 rounded-full opacity-70 hover:opacity-100 transition-opacity"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
