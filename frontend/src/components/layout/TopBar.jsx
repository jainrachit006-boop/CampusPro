import { React, useState } from 'react'
import { Search, Menu, LogOut } from 'lucide-react'

export default function TopBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header
      className="flex items-center justify-between px-6 py-4 border-b border-border bg-white shadow-sm"
    >
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold">Campus Intelligence</h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleMenu}
          className="p-2 rounded hover:bg-border"
          aria-label="Open main menu"
        >
          <AiOutlineMenu size={24} />
        </button>

        <button
          onClick={() => window.location.href = '/'}
          className="p-2 rounded hover:bg-border"
          aria-label="Refresh page"
        >
          <AiOutlineMenu size={24} />
        </button>
      </div>
    </header>
  )
}