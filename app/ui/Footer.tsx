import {Link} from "react-router"
import { Gamepad2, Github, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-4 bg-white/5">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-white">
              <Gamepad2 className="h-6 w-6 text-primary" />
              <span>FuncCards</span>
            </Link>
            <p className="text-sm text-white/70">Aprende programación funcional jugando</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Juego</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/play" className="text-white/70 hover:text-white transition-colors">
                  Jugar Ahora
                </Link>
              </li>
              <li>
                <Link to="/rules" className="text-white/70 hover:text-white transition-colors">
                  Reglas
                </Link>
              </li>
              <li>
                <Link to="/cards" className="text-white/70 hover:text-white transition-colors">
                  Todas las Cartas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Aprender</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/tutorial" className="text-white/70 hover:text-white transition-colors">
                  Tutorial
                </Link>
              </li>
              <li>
                <Link to="/concepts" className="text-white/70 hover:text-white transition-colors">
                  Conceptos FP
                </Link>
              </li>
              <li>
                <Link to="/examples" className="text-white/70 hover:text-white transition-colors">
                  Ejemplos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Comunidad</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-white/70 hover:text-white transition-colors">
                  Sobre los Creadores
                </Link>
              </li>
              <li>
                <Link to="https://github.com" className="text-white/70 hover:text-white transition-colors">
                  GitHub
                </Link>
              </li>
              <li>
                <Link to="https://discord.com" className="text-white/70 hover:text-white transition-colors">
                  Discord
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/70">© 2025 FuncCards. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <Link to="https://github.com" className="text-white/70 hover:text-white transition-colors">
              <Github className="h-5 w-5" />
            </Link>
            <Link to="https://twitter.com" className="text-white/70 hover:text-white transition-colors">
              <Twitter className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
