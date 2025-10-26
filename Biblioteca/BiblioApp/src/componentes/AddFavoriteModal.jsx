export default function AddFavoriteModal({ open, onClose, onConfirm, book }) {
  // Modal de confirmación para agregar a favoritos
  if (!open) return null
  return (
    <div className="fixed inset-0 z-20 bg-black/40 grid place-items-center p-4">
      <div role="dialog" aria-modal="true"
           className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <h3 className="text-lg font-semibold">Añadir a Favoritos</h3>
        <p className="mt-2 text-sm text-gray-600">
          ¿Quieres añadir <span className="font-medium text-gray-800">“{book?.title}”</span> a tus favoritos?
        </p>

        <div className="mt-4 flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="rounded-xl border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  )
}
