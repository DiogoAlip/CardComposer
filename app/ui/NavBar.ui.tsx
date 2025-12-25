import { useState } from "react"
import { Link } from 'react-router';
import { Button } from "../components/ui/button"
import { Gamepad2, Menu, X } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-border bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/90">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-white">
          <Gamepad2 className="h-6 w-6 text-primary" />
          <span>CardComposer</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/tutorial" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
            Tutorial
          </Link>
          <Link to="/about" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
            Sobre los Creadores
          </Link>
          <Button size="sm" className="ml-2 bg-gradient-to-r from-[#FAD126] to-[#FF564E] hover:scale-110 transition-all">
            <Link to="/play">
              Jugar
            </Link>
          </Button>
        </div>
      <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center justify-center p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
        </button>
      </div>
        {isOpen && (
        <div className="md:hidden bg-black/95 border-b border-border">
          <div className="container flex justify-center mx-auto px-4 py-4 flex flex-col gap-3">            
            <Link
              to="/tutorial"
              className="text-sm font-medium text-white/70 hover:text-white transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Tutorial
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium text-white/70 hover:text-white transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Sobre los Creadores
            </Link>
            <Link
              to="/play"
              onClick={() => setIsOpen(false)}
            >
              <Button size="sm" className="w-full bg-gradient-to-r from-[#FAD126] to-[#FF564E] mt-2">
                Jugar
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
