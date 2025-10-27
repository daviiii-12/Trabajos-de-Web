// Wikipedia ES (resumen) + Dragon Ball API (personajes) + JSON local (sagas)
const WIKI_TITULO = 'Dragon_Ball_Z';
const WIKI_SUMMARY = `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(WIKI_TITULO)}`;
const DBZ_CHAR_URL = 'https://dragonball-api.com/api/characters?limit=6';

const elNombre = document.getElementById('nombre-serie');
const elResumen = document.getElementById('resumen');
const ulTemporadas = document.getElementById('lista-temporadas');
const ulPersonajes = document.getElementById('lista-personajes');
const visor = document.getElementById('visor3d');
const btnRotar = document.getElementById('btn-rotar');

const txt = (s) => (typeof s === 'string' && s.trim().length ? s.trim() : null);

// Fallback local
async function cargarFallbackLocal() {
  try {
    const r = await fetch('./src/datos/serie.json');
    const d = await r.json();

    if (txt(d?.nombre)) elNombre.textContent = d.nombre;
    if (txt(d?.resumen)) elResumen.textContent = d.resumen;

    if (Array.isArray(d?.temporadas) && d.temporadas.length) {
      ulTemporadas.innerHTML = d.temporadas.map(t => `<li>${t}</li>`).join('');
    }

    if (Array.isArray(d?.personajes) && d.personajes.length) {
      ulPersonajes.innerHTML = d.personajes
        .map(n => `<li class="personaje sin-foto"><span>${n}</span></li>`)
        .join('');
    }
  } catch {/* no-op */}
}

// Sinopsis (Wikipedia ES)
async function cargarWikiEs() {
  const r = await fetch(WIKI_SUMMARY, { headers: { 'Accept': 'application/json' }});
  const j = await r.json();
  if (txt(j?.title)) elNombre.textContent = j.title;
  if (txt(j?.extract)) elResumen.textContent = j.extract;
}

// Personajes (Dragon Ball API)
async function cargarPersonajes() {
  const r = await fetch(DBZ_CHAR_URL, { headers: { 'Accept': 'application/json' }});
  const j = await r.json();
  const items = Array.isArray(j) ? j : (j.items || j.characters || []);
  if (!items?.length) throw new Error('sin personajes');

  ulPersonajes.innerHTML = items.slice(0, 6).map(c => {
    const nombre = c.spanishName || c.name || 'Personaje';
    const img = c.image || c.photo || null;

    if (img) {
      return `
        <li class="personaje">
          <img src="${img}" alt="" onerror="this.onerror=null; this.remove();" />
          <span>${nombre}</span>
        </li>
      `;
    } else {
      return `<li class="personaje sin-foto"><span>${nombre}</span></li>`;
    }
  }).join('');
}

// Temporadas/Sagas (local)
async function cargarTemporadasLocal() {
  try {
    const r = await fetch('./src/datos/serie.json');
    const d = await r.json();
    if (Array.isArray(d?.temporadas) && d.temporadas.length) {
      ulTemporadas.innerHTML = d.temporadas.map(t => `<li>${t}</li>`).join('');
    }
  } catch {/* no-op */}
}

// Rotación del visor
function setAutoRotate(on){
  if(!visor) return;
  if(on){
    visor.setAttribute('auto-rotate','');
    btnRotar.textContent = 'Pausar rotación';
    btnRotar.setAttribute('aria-pressed','true');
  }else{
    visor.removeAttribute('auto-rotate');
    btnRotar.textContent = 'Reanudar rotación';
    btnRotar.setAttribute('aria-pressed','false');
  }
}
btnRotar.addEventListener('click', () => {
  const activo = btnRotar.getAttribute('aria-pressed') === 'true';
  setAutoRotate(!activo);
});
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setAutoRotate(false);

// Flujo
(async () => {
  try {
    await cargarWikiEs();
    await cargarPersonajes();
    await cargarTemporadasLocal();
  } catch {
    await cargarFallbackLocal();
  }
})();
