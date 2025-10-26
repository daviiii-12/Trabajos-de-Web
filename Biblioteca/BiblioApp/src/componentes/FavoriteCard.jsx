export default function FavoriteCard({ book, onRemove }) {
  // Card compacta para favoritos con botón eliminar
  const { title, author, year, coverUrl } = book
  return (
    <article className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full grid place-items-center text-gray-400">
            📖
          </div>
        )}
      </div>
      <div className="p-4 space-y-1">
        <h3 className="text-base font-semibold leading-tight line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-600 line-clamp-1">{author}</p>
        <p className="text-xs text-gray-500">{year ?? '—'}</p>
        <div className="pt-2">
          <button
            onClick={onRemove}
            className="w-full rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700"
          >
            Eliminar
          </button>
        </div>
      </div>
    </article>
  )
}
