export default function CharacterCard({ image, name, species, status, big = false }) {
  return (
    <article className={`card ${big ? 'card--hero' : ''}`} role="figure" aria-label={`Personaje ${name}`}>
      <div className="card-media">
        <img className="card-img" src={image} alt={name} loading="eager" decoding="async" />
      </div>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p className="card-text"><strong>Especie:</strong> {species}</p>
        <p className="card-text"><strong>Estado:</strong> {status}</p>
      </div>
    </article>
  )
}
