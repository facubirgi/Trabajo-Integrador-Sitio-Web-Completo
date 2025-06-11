// Simulación de login (en un proyecto real usa autenticación segura)
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      localStorage.setItem('isAuthenticated', 'true');
      window.location.href = 'home.html';
    });
  }

  // Logout
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('isAuthenticated');
    });
  }

  // Proteger rutas
  if (!localStorage.getItem('isAuthenticated') && !window.location.pathname.includes('login.html')) {
    window.location.href = 'login.html';
  }
});