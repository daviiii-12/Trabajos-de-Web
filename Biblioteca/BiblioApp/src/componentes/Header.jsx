export default function Header() {
  // Hago scroll suave a las secciones por id
  const goTo = (id) => (e) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
          <span className="text-indigo-600">Biblio</span>
          <span className="text-gray-800">App</span>
        </h1>

        <nav className="hidden sm:flex gap-6 text-sm text-gray-700">
          <a href="#inicio" onClick={goTo('inicio')} className="hover:text-gray-900 flex items-center gap-1">
            <span>🏠</span> <span>Inicio</span>
          </a>
          <a href="#libros" onClick={goTo('libros')} className="hover:text-gray-900 flex items-center gap-1">
            <span>📚</span> <span>Libros</span>
          </a>
          <a href="#favoritos" onClick={goTo('favoritos')} className="hover:text-gray-900 flex items-center gap-1">
            <span>⭐</span> <span>Favoritos</span>
          </a>
        </nav>
      </div>
    </header>
  )
}
