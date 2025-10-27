(() => {
  const NOMBRES = ['Charizard', 'Diglett', 'Dragonite', 'Growlithe', 'Sylveon'];

  const GLB_MAP = {
    charizard: './src/imagenes/charizard.glb',
    diglett  : './src/imagenes/Diglett.glb',
    dragonite: './src/imagenes/dragonite.glb',
    growlithe: './src/imagenes/Growlithe.glb',
    sylveon  : './src/imagenes/sylveon.glb'
  };

  // lowerName -> { name, id, imagen, types[], glb, status, boosted }
  const estado = new Map();

  const fila = document.getElementById('grid-cartas');
  const sndAceptar = document.getElementById('snd-aceptar');
  const sndCancelar = document.getElementById('snd-cancelar');

  const safePlay = (audioEl) => {
    if (!audioEl) return;
    try { const p = audioEl.play(); if (p?.catch) p.catch(() => {}); } catch {}
  };

  /* --------- Datos --------- */
  let fallbackIdx = {};
  async function cargarFallback() {
    try {
      const r = await fetch('./src/datos/cartas.json', {cache:'no-store'});
      if (!r.ok) throw new Error();
      const data = await r.json();
      data.forEach(x => { fallbackIdx[x.name.toLowerCase()] = x; });
    } catch { fallbackIdx = {}; }
  }

  async function desdeAPI(name) {
    const url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
    const r = await fetch(url);
    if (!r.ok) throw new Error('PokéAPI falló');
    const data = await r.json();
    const img = data?.sprites?.other?.['official-artwork']?.front_default || '';
    const id = data?.id ?? null;
    const types = (data?.types || []).map(t => t.type?.name || '').filter(Boolean);
    if (!img) throw new Error('sin oficial artwork');
    return { id, imagen: img, types };
  }

  function desdeFallback(name) {
    const f = fallbackIdx[name.toLowerCase()];
    if (!f) return { id:null, imagen:'', types:[] };
    return { id: f.id ?? null, imagen: f.image || '', types: [] };
  }

  async function prepararCartas() {
    await cargarFallback();
    for (const nombre of NOMBRES) {
      const k = nombre.toLowerCase();
      if (estado.has(k)) continue;
      let id=null, imagen='', types=[];
      try {
        const d = await desdeAPI(nombre);
        id = d.id; imagen = d.imagen; types = d.types;
      } catch {
        const fb = desdeFallback(nombre);
        id = fb.id; imagen = fb.imagen; types = fb.types;
      }
      estado.set(k, { name:nombre, id, imagen, types, glb:GLB_MAP[k], status:'Disponible', boosted:false });
    }
  }

  /* --------- UI helpers --------- */
  const Title = s => s ? s[0].toUpperCase()+s.slice(1) : s;
  const tiposTxt = a => a?.length ? a.map(t=>Title(t)).join(' / ') : '—';

  function addPressFx(wrap){
    const down = () => wrap.classList.add('is-press');
    const up   = () => wrap.classList.remove('is-press');
    wrap.addEventListener('pointerdown', down);
    wrap.addEventListener('pointerup', up);
    wrap.addEventListener('pointerleave', up);
    wrap.addEventListener('pointercancel', up);
  }

  function crearCarta(data) {
    const { name, imagen, types, status, glb, boosted } = data;
    const k = name.toLowerCase();
    const isInvocada = status === 'Invocada';

    const wrap = document.createElement('article');
    wrap.className = 'wrap';
    wrap.dataset.key = k;
    wrap.setAttribute('role','group');
    wrap.setAttribute('tabindex','0');
    wrap.setAttribute('aria-label',`Carta ${name}`);
    if (!boosted) wrap.classList.add('first');
    addPressFx(wrap);

    /* Frente */
    const frente = document.createElement('div');
    frente.className = 'cara cara-frente';

    const frenteArte = document.createElement('div');
    frenteArte.className = 'frente-arte';
    const img = document.createElement('img');
    img.src = imagen || '';
    img.alt = `Arte oficial de ${name}`;
    frenteArte.appendChild(img);

    const frenteInfo = document.createElement('div');
    frenteInfo.className = 'frente-info';

    const header = document.createElement('div');
    header.className = 'header';
    const h = document.createElement('h3');
    h.className = 'nombre';
    h.textContent = name;
    const badge = document.createElement('span');
    badge.className = 'badge' + (isInvocada ? ' invocada' : '');
    badge.textContent = status;
    header.append(h, badge);

    const meta = document.createElement('p');
    meta.className = 'meta';
    meta.textContent = `Tipos: ${tiposTxt(types)}`;

    const actionsA = document.createElement('div');
    actionsA.className = 'actions';

    const btnVer3D = document.createElement('button');
    btnVer3D.className = 'btn btn-sec';
    btnVer3D.type = 'button';
    btnVer3D.textContent = 'Ver 3D';
    btnVer3D.addEventListener('click', () => {
      wrap.classList.add('flipped');
      if (!estado.get(k).boosted) {
        setTimeout(() => wrap.classList.remove('first'), 600);
        const d = estado.get(k); d.boosted = true; estado.set(k, d);
      }
      safePlay(sndAceptar);
    });

    const btnInvocar = document.createElement('button');
    btnInvocar.className = 'btn';
    btnInvocar.type = 'button';
    btnInvocar.textContent = 'Invocar';
    btnInvocar.disabled = isInvocada;
    btnInvocar.addEventListener('click', () => invocar(k, false));

    const btnCancelarInv = document.createElement('button');
    btnCancelarInv.className = 'btn btn-ghost';
    btnCancelarInv.type = 'button';
    btnCancelarInv.textContent = 'Cancelar';
    btnCancelarInv.disabled = !isInvocada;
    btnCancelarInv.addEventListener('click', () => cancelarInvocacion(k, false));

    actionsA.append(btnVer3D, btnInvocar, btnCancelarInv);

    frenteInfo.append(header, meta, actionsA);
    frente.append(frenteArte, frenteInfo);

    /* Dorso 3D */
    const dorso = document.createElement('div');
    dorso.className = 'cara cara-dorso';

    const visorBox = document.createElement('div');
    visorBox.className = 'dorso-visor';

    const mv = document.createElement('model-viewer');
    mv.setAttribute('src', glb || '');
    if (imagen) mv.setAttribute('poster', imagen);
    mv.setAttribute('ar','');
    mv.setAttribute('ar-modes','webxr scene-viewer quick-look');
    mv.setAttribute('camera-controls',''); // control manual
    mv.setAttribute('touch-action','pan-y');
    mv.setAttribute('shadow-intensity','1');
    mv.setAttribute('exposure','1');
    visorBox.appendChild(mv);

    const bar = document.createElement('div');
    bar.className = 'dorso-bar';

    const left = document.createElement('div');
    left.className = 'dorso-left';
    const thumb = document.createElement('img');
    thumb.className = 'thumb';
    thumb.src = imagen || '';
    thumb.alt = `Miniatura de ${name}`;
    const h2 = document.createElement('h3');
    h2.className = 'nombre'; h2.style.margin='0';
    h2.textContent = name;
    left.append(thumb, h2);

    const actionsB = document.createElement('div');
    actionsB.className = 'actions';

    const btnInvocarB = document.createElement('button');
    btnInvocarB.className = 'btn';
    btnInvocarB.type = 'button';
    btnInvocarB.textContent = 'Invocar';
    btnInvocarB.addEventListener('click', () => invocar(k, true));

    const btnCancelarInvB = document.createElement('button');
    btnCancelarInvB.className = 'btn btn-ghost';
    btnCancelarInvB.type = 'button';
    btnCancelarInvB.textContent = 'Cancelar';
    btnCancelarInvB.addEventListener('click', () => cancelarInvocacion(k, true));

    const btnVolver = document.createElement('button');
    btnVolver.className = 'btn btn-sec';
    btnVolver.type = 'button';
    btnVolver.textContent = 'Volver';
    btnVolver.addEventListener('click', () => {
      safePlay(sndCancelar);
      wrap.classList.remove('flipped');
    });

    actionsB.append(btnInvocarB, btnCancelarInvB, btnVolver);
    bar.append(left, actionsB);

    dorso.append(visorBox, bar);

    wrap.append(frente, dorso);

    // según estado, oculta/activa botones
    toggleBotonera({ isInvocada, btnInvocar, btnCancelarInv, btnInvocarB, btnCancelarInvB });

    return wrap;
  }

  function toggleBotonera({ isInvocada, btnInvocar, btnCancelarInv, btnInvocarB, btnCancelarInvB }) {
    // Frente: puedes cancelar si está invocada
    btnInvocar.disabled = isInvocada;
    btnCancelarInv.disabled = !isInvocada;

    // Dorso: si está invocada, oculto invocar y cancelar; dejo solo Volver
    if (isInvocada) {
      btnInvocarB.classList.add('is-hidden');
      btnCancelarInvB.classList.add('is-hidden');
    } else {
      btnInvocarB.classList.remove('is-hidden');
      btnCancelarInvB.classList.add('is-hidden'); // oculto cancelar si aún no se invoca
    }
  }

  function refreshCard(k, keepFlip=false){
    const old = document.querySelector(`.wrap[data-key="${k}"]`);
    if (!old) return render(); // fallback
    const data = estado.get(k);
    const flipped = keepFlip ? old.classList.contains('flipped') : false;
    const first = old.classList.contains('first');
    const neu = crearCarta(data);
    if (flipped) neu.classList.add('flipped');
    if (first) neu.classList.add('first');
    fila.replaceChild(neu, old);
  }

  function render() {
    fila.innerHTML = '';
    for (const nombre of NOMBRES) {
      const d = estado.get(nombre.toLowerCase());
      if (!d) continue;
      fila.appendChild(crearCarta(d));
    }
  }

  function setEstado(k, nuevo) {
    const d = estado.get(k);
    if (!d) return;
    d.status = nuevo;
    estado.set(k, d);
  }

  function invocar(k, keepFlip){
    setEstado(k, 'Invocada');
    safePlay(sndAceptar);
    refreshCard(k, keepFlip);
  }

  function cancelarInvocacion(k, keepFlip){
    setEstado(k, 'Disponible');
    safePlay(sndCancelar);
    refreshCard(k, keepFlip);
  }

  /* Init */
  (async function init(){
    await prepararCartas();
    render();
  })();
})();
