export default function EmptyState({ title, description }) {
  // Estado vacío reutilizable
  return (
    <div className="rounded-2xl border border-dashed bg-white p-6 text-center text-gray-600">
      <div className="text-3xl mb-2">🔎</div>
      <h4 className="text-base font-semibold text-gray-800">{title}</h4>
      {description && <p className="text-sm mt-1">{description}</p>}
    </div>
  )
}
