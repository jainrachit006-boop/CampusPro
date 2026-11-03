import { React, useState } from 'react'
import { AiOutlineMenu, AiOutlineClose } from 'lucide-react'

const navigationLinks = [
  { path: '/', label: 'Dashboard' },
  { path: '/complaints', label: 'Complaints' },
  { path: '/priority', label: 'Priority Queue' },
  { path: '/analytics', label: 'Analytics' },
  { path: '/assistant', label: 'AI Assistant' },
]

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('/')

  const toggle = () => setIsOpen(!isOpen)
  const setActive = (path) => {
    setActiveLink(path)
    setIsOpen(false)
  }

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } z-50 border-r border-border"
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-xl font-bold">Campus Intel</h2>
        <button
          onClick={toggle}
          className="p-2 rounded hover:bg-border"
          aria-label="Toggle navigation"
        >
          {isOpen ? <AiOutlineClose size={24} /> <span>Close</span> : <AiOutlineMenu size={24} />}
        </button>
      </div>

      <nav className="flex flex-col pt-6 space-y-2">
        {navigationLinks.map((link) => (
          <button
            key={link.path}
            onClick={() => setActive(link.path)}
            className`
              flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${
                activeLink === link.path
                  ? 'bg-primary-100 text-primary-800'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-primary-800'
              }
            `
            aria-current={activeLink === link.path ? 'page' : undefined}
          >
            {link.label}
          </button>
        ))}
      </nav>

      <div className="mt-6 p-3 text-xs text-gray-500 border-t border-border">
        <span>Campus Intelligence v1.0.0</span>
      </div>
    </aside>
  )
}