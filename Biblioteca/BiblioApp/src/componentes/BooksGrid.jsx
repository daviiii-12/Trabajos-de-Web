import BookCard from './BookCard.jsx'

export default function BooksGrid({ books, onAdd }) {
  // Pinto una grilla responsive de cards
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {books.map(b => (
        <BookCard key={b.id} book={b} onAdd={() => onAdd(b)} />
      ))}
    </div>
  )
}
