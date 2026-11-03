import { React } from 'react'

export default function MainContent({ children }) {
  return (
    <main
      className="flex-1 p-6 transition-opacity duration-300"
    >
      {children}
    </main>
  )
}