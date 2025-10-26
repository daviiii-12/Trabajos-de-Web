export default function SearchBar({ query, onQueryChange, onSubmit }) {
  // Agrego un log para confirmar que el form dispara el submit.
  return (
    <form
      onSubmit={(e) => { console.log('[SearchBar] submit'); onSubmit(e) }}
      className="flex gap-2"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Buscar por título o autor (ej: García Márquez, Harry Potter)"
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:ring-4 focus:ring-indigo-100"
      />
      <button
        type="submit"
        className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700 active:scale-[0.99]"
      >
        Buscar
      </button>
    </form>
  )
}
