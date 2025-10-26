import { useEffect, useState } from 'react'
import Header from './componentes/Header.jsx'
import CharacterCard from './componentes/CharacterCard.jsx'
import './App.css'

const MAX_ID = 826 // rango típico de ids en la API

export default function App() {
  // Yo sólo manejo UN personaje porque la pantalla muestra una sola card.
  const [character, setCharacter] = useState(null)

  // Estos estados me ayudan a manejar UX básica.
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Este key lo uso sólo para "forzar" la animación al cambiar de personaje.
  // Cada vez que sumo 1, React vuelve a montar el nodo y dispara el fade-in.
  const [animKey, setAnimKey] = useState(0)

  // -- Función para pedir un personaje aleatorio --

  async function fetchRandomCharacter() {
    setLoading(true)
    setError(null)

    // Hago hasta 5 intentos
    for (let intento = 0; intento < 5; intento++) {
      const id = Math.floor(Math.random() * MAX_ID) + 1
      try {
        const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)

        const data = await res.json()

        // Guardo sólo lo que voy a mostrar en la card (suficiente para esta vista).
        setCharacter({
          image: data.image,
          name: data.name,
          species: data.species,
          status: data.status
        })

        // Subo el key para que se vea la animación de entrada en cada cambio.
        setAnimKey((k) => k + 1)

        setLoading(false)
        return // si ya cargó uno bien, me salgo de la función
      } catch {
        // Si falló ese id, simplemente sigo el for y pruebo otro.
      }
    }

    // Si llego acá, ninguno de los intentos funcionó.
    setError('No pude cargar un personaje. Intenta de nuevo.')
    setLoading(false)
  }

  // -- Cargo un personaje al montar el componente --
  // Lo dejo con deps vacías para que NO se dispare solo una y otra vez.
  useEffect(() => {
    fetchRandomCharacter()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="app app--center">
      {/* Header minimal: título y ya */}
      <Header title="Rick & Morty · Personaje aleatorio" />

      {/* Mensajes de estado bien directos */}
      {loading && <p className="status">Cargando personaje...</p>}
      {error && <p className="status error">{error}</p>}

      {/* Cuando tengo datos, pinto la card con un contenedor que anima su entrada */}
      {!loading && !error && character && (
        <>
          {/* clave cambia => React remonta => corre el @keyframes */}
          <div key={animKey} className="fade-in">
            <CharacterCard
              image={character.image}
              name={character.name}
              species={character.species}
              status={character.status}
              big
            />
          </div>

          {/* Botón para pedir OTRO personaje random cuando yo quiera */}
          <div className="actions">
            <button
              className="btn"
              onClick={fetchRandomCharacter}
              disabled={loading}
              aria-label="Siguiente personaje aleatorio"
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  )
}
