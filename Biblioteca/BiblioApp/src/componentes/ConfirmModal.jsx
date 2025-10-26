export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = 'Confirmar',
  description = '¿Deseas continuar?',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
}) {
  // Modal de confirmación genérico
  if (!open) return null
  return (
    <div className="fixed inset-0 z-20 bg-black/40 grid place-items-center p-4">
      <div role="dialog" aria-modal="true"
           className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{description}</p>

        <div className="mt-4 flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="rounded-xl border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
