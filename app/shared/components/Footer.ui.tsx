import { Link } from "react-router";
import { Gamepad2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border pt-12 pb-8 bg-white/5 px-6 md:px-0">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col justify-center items-center gap-8 mb-12 px-12">
          <div className="flex flex-col items-center text-center md:text-left gap-2">
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
            <Link to="/play" className="hover:text-white transition-colors">
              Jugar Ahora
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 px-12">
          <p className="text-xs text-white/50">
            © 2026 CardComposer version Beta
          </p>
          <div className="flex items-center opacity-70 hover:opacity-100 gap-4">
            <Link
              to="https://github.com/DiogoAlip/CardComposer"
              className="text-white transition-colors flex items-center gap-2 text-xs"
              target="_blank"
            >
              <span>Ver en GitHub</span>
              <img
                src="/github.svg"
                alt="GitHub"
                className="invert scale-110 h-5 w-5 border-0 rounded-full transition-opacity"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
