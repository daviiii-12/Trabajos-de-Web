/* =========================
   auth.js
   Centraliza autenticación (modo demo)
   - role: "admin" | "cobrador"
   - username: string
   - helpers: requireRole, logout, etc.
   ========================= */

(function () {
  const KEY_ROLE = "role";
  const KEY_USER = "username";

  function getRole() {
    return sessionStorage.getItem(KEY_ROLE);
  }

  function setRole(role) {
    sessionStorage.setItem(KEY_ROLE, role);
  }

  function clearRole() {
    sessionStorage.removeItem(KEY_ROLE);
  }

  function getUsername() {
    return sessionStorage.getItem(KEY_USER);
  }

  function setUsername(username) {
    sessionStorage.setItem(KEY_USER, username);
  }

  function clearUsername() {
    sessionStorage.removeItem(KEY_USER);
  }

  function clearSession() {
    sessionStorage.clear();
  }

  function go(path) {
    window.location.href = path;
  }

  function requireRole(expectedRole, fallback = "./index.html") {
    const role = getRole();
    if (role !== expectedRole) {
      go(fallback);
      return false;
    }
    return true;
  }

  function requireAuth(fallback = "./index.html") {
    const role = getRole();
    const user = getUsername();
    if (!role || !user) {
      go(fallback);
      return false;
    }
    return true;
  }

  function logout(redirectTo = "./index.html") {
    clearSession();
    go(redirectTo);
  }

  function todayKey() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`; // YYYY-MM-DD
  }

  function isDayClosed() {
    const key = "closedDay:" + todayKey();
    return localStorage.getItem(key) === "true";
  }

  // Exponer API simple
  window.Auth = {
    getRole,
    setRole,
    clearRole,

    getUsername,
    setUsername,
    clearUsername,

    requireRole,
    requireAuth,

    logout,
    go,

    todayKey,
    isDayClosed
  };
})();
