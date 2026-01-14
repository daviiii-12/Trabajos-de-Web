# Control de Préstamos (Frontend) — Demo

Frontend web responsive para un sistema de control de préstamos con roles:
- **Administrador**
- **Cobrador**

Este proyecto es una **demo funcional en frontend** (sin backend todavía).
La información se guarda en el navegador usando **localStorage** y **sessionStorage**.

---

## ✅ Requisitos
- Navegador (Chrome recomendado)
- Opcional (recomendado): **VS Code + Live Server**

---

## ▶️ Cómo ejecutar

### Opción A: Live Server (recomendado)
1. Abre la carpeta `Fronted/` en VS Code
2. Instala la extensión **Live Server**
3. Clic derecho en `index.html` → **Open with Live Server**

### Opción B: abrir directo
Abre `index.html` con doble clic.
> Nota: algunas funciones pueden comportarse mejor con Live Server.

---

## 🧭 Flujo de pantallas
1. `index.html` → elegir rol (Administrador / Cobrador)
2. `login.html` → login (demo: solo valida que no esté vacío)
3. Redirección:
   - admin → `admin.html`
   - cobrador → `cobrador.html`

---

## 🔐 Roles y reglas (demo)
### Cobrador
- Puede:
  - Registrar préstamos
  - Registrar pagos/abonos
  - Exportar sus préstamos a CSV
  - Solicitar correcciones
- No puede:
  - Editar monto/porcentaje después de guardar (regla antifraude)

### Administrador
- Puede:
  - Ver solicitudes de corrección (pendientes)
  - Aprobar/rechazar (demo)
  - Cerrar el día (check importante)
  - Exportar carteras (demo) a CSV

---

## 💾 Dónde se guarda la info (demo)

### sessionStorage (se borra al cerrar pestaña)
- `role`: `"admin"` o `"cobrador"`
- `username`: usuario digitado en login

### localStorage (permanece hasta que lo borres)
- `closedDay:YYYY-MM-DD`: marca si el día está cerrado (admin)
- `demo:<username>:loans`: préstamos del cobrador
- `demo:<username>:payments`: pagos del cobrador
- `demo:corrections`: solicitudes de corrección (compartido para que el admin las vea)

---

## ✅ Cierre del día
En `admin.html` existe el botón **“Cerrar día”**:
- guarda `closedDay:YYYY-MM-DD = true` en localStorage
- si el día está cerrado, el cobrador **no puede registrar** préstamos ni pagos (demo)

---

## ♻️ Reset rápido de la demo
Si quieres “borrar todo”:

### Opción 1 (desde el navegador)
1. Abre DevTools (F12)
2. Application → Storage
3. Clear site data

### Opción 2 (desde consola)
En la consola del navegador:
```js
localStorage.clear();
sessionStorage.clear();
