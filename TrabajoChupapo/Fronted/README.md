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

---

## 🧭 Flujo de pantallas (nuevo)
1. `index.html` → **Login inmediato**
2. El sistema detecta el rol (demo) y redirige:
   - admin → `admin.html`
   - cobrador → `cobrador.html`

> En versión final el rol se definirá por backend (correo + contraseña).

---

## 🔐 Roles y reglas (demo)

### Administrador
- Aprobar/rechazar solicitudes de corrección
- Cerrar el día
- Exportar datos (demo)

### Cobrador
- Registrar préstamos
- Registrar pagos/abonos
- Solicitar correcciones
- Exportar sus préstamos (CSV)

---

## 💾 Dónde se guarda la info (demo)

### sessionStorage (se borra al cerrar pestaña)
- `role`: `"admin"` o `"cobrador"`
- `username`: usuario/correo digitado en login

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
En la consola del navegador:
```js
localStorage.clear();
sessionStorage.clear();
