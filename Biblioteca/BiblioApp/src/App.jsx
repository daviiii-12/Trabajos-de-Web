import { useEffect, useMemo, useState } from 'react'
import './App.css'

import Header from './componentes/Header.jsx'
import SearchBar from './componentes/SearchBar.jsx'
import BooksGrid from './componentes/BooksGrid.jsx'
import FavoritesPanel from './componentes/FavoritesPanel.jsx'
import AddFavoriteModal from './componentes/AddFavoriteModal.jsx'
import ConfirmModal from './componentes/ConfirmModal.jsx'
import EmptyState from './componentes/EmptyState.jsx'
import Spinner from './componentes/Spinner.jsx'

const LS_KEY = 'biblioapp:favoritos'

function mapDocToBook(doc) {
  const title = doc?.title ?? 'Título no disponible'
  const author = Array.isArray(doc?.author_name) && doc.author_name.length > 0
    ? doc.author_name[0]
    : 'Autor no disponible'
  const year = doc?.first_publish_year ?? null
  const coverId = doc?.cover_i
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : null
  const id = doc?.key
    ? String(doc.key)
    : `${title}__${author}__${year ?? 's/a'}`.toLowerCase().replace(/\s+/g, '-')

  return { id, title, author, year, coverUrl }
}

export default function App() {
  // búsqueda/resultados
  const [query, setQuery] = useState('')
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // favoritos (persistencia inmediata + LS)
  const [favoritos, setFavoritos] = useState(() => {
    try { return JSON.parse(localStorage.getItem(LS_KEY)) ?? [] } catch { return [] }
  })
  useEffect(() => { localStorage.setItem(LS_KEY, JSON.stringify(favoritos)) }, [favoritos])

  // modales
  const [addOpen, setAddOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)

  // buscar en Open Library
  async function buscarLibros(ev) {
    ev?.preventDefault?.()
    const q = query.trim()
    if (!q) return
    setLoading(true); setError(null); setBooks([])
    try {
      const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=30`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      const mapped = Array.isArray(data?.docs) ? data.docs.map(mapDocToBook) : []
      setBooks(mapped)
      if (mapped.length === 0) setError('No encontramos resultados para tu búsqueda.')
    } catch (e) {
      console.error(e); setError('Ocurrió un error al consultar la API. Intenta de nuevo.')
    } finally { setLoading(false) }
  }

  // alta/baja favoritos
  function solicitarAgregar(book) { setSelectedBook(book); setAddOpen(true) }
  function confirmarAgregar() {
    if (!selectedBook) return
    const yaEsta = favoritos.some(f => f.id === selectedBook.id)
    if (!yaEsta) setFavoritos(prev => [selectedBook, ...prev])
    setAddOpen(false); setSelectedBook(null)
    // scroll hacia favoritos para que el usuario lo vea aparecer
    queueMicrotask(() => document.getElementById('favoritos')?.scrollIntoView({ behavior: 'smooth' }))
  }

  function solicitarEliminar(book) { setSelectedBook(book); setConfirmOpen(true) }
  function confirmarEliminar() {
    if (!selectedBook) return
    setFavoritos(prev => prev.filter(f => f.id !== selectedBook.id))
    setConfirmOpen(false); setSelectedBook(null)
  }

  const resultadosTitulo = useMemo(() => {
    if (loading) return 'Buscando libros...'
    if (error && books.length === 0) return 'Sin resultados'
    return 'Resultados'
  }, [loading, error, books])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" id="inicio">
      <Header />

      <main className="mx-auto w-full max-w-6xl px-4 py-6 space-y-8">
        {/* Buscador */}
        <SearchBar
          query={query}
          onQueryChange={setQuery}
          onSubmit={buscarLibros}
        />

        {/* Resultados */}
        <section className="space-y-3" id="libros">
          <h2 className="text-lg font-semibold text-gray-800">{resultadosTitulo}</h2>

          {loading && (
            <div className="flex justify-center py-10">
              <Spinner />
            </div>
          )}

          {!loading && error && books.length === 0 && (
            <EmptyState
              title="No hay resultados"
              description={query ? `No encontramos resultados para “${query}”. Prueba con otro término.` : 'Empieza buscando por título o autor.'}
            />
          )}

          {!loading && !error && books.length === 0 && !query && (
            <EmptyState
              title="Busca un libro para empezar"
              description="Escribe un título o autor y presiona Buscar."
            />
          )}

          {!loading && books.length > 0 && (
            <BooksGrid books={books} onAdd={solicitarAgregar} />
          )}
        </section>

        {/* Favoritos */}
        <section className="space-y-3" id="favoritos">
          <h2 className="text-lg font-semibold text-gray-800">Favoritos</h2>
          {favoritos.length === 0 ? (
            <EmptyState
              title="Aún no tienes favoritos"
              description="Añade libros desde los resultados para verlos aquí."
            />
          ) : (
            <FavoritesPanel favorites={favoritos} onRemove={solicitarEliminar} />
          )}
        </section>
      </main>

      {/* Modales */}
      <AddFavoriteModal
        open={addOpen}
        onClose={() => { setAddOpen(false); setSelectedBook(null) }}
        onConfirm={confirmarAgregar}
        book={selectedBook}
      />

      <ConfirmModal
        open={confirmOpen}
        onClose={() => { setConfirmOpen(false); setSelectedBook(null) }}
        onConfirm={confirmarEliminar}
        title="Eliminar de favoritos"
        description={`¿Seguro que quieres eliminar “${selectedBook?.title ?? ''}” de tus favoritos?`}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </div>
  )
}
