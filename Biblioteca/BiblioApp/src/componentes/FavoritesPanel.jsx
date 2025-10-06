import FavoriteCard from './FavoriteCard.jsx'

export default function FavoritesPanel({ favorites, onRemove }) {
  // Muestro favoritos con cards compactas
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {favorites.map(f => (
        <FavoriteCard key={f.id} book={f} onRemove={() => onRemove(f)} />
      ))}
    </div>
  )
}
