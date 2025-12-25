import { Link } from 'react-router';
import { Button } from "../components/ui/button"
import { Gamepad2 } from "lucide-react"

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-border bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/90">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-white">
          <Gamepad2 className="h-6 w-6 text-primary" />
          <span>CardComposer</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/tutorial" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
            Tutorial
          </Link>
          <Link to="/about" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
            Sobre los Creadores
          </Link>
          <Button size="sm" className="ml-2 bg-gradient-to-r from-[#FAD126] to-[#FF564E] hover:scale-110 transition-all">
            <Link to="/gamemode">
              Jugar
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
