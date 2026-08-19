/* ===========================================
   SIMPLE AUTH — email only, no password
   Stores the email in localStorage.
   Handles login, board access, and logout.
=========================================== */

// Get login form elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const errorMsg = document.getElementById('errorMsg');

// -------------------------------------------
// LOGIN
// -------------------------------------------

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();

    // Basic email validation
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValidEmail) {
      errorMsg.classList.remove('hidden');
      return;
    }

    errorMsg.classList.add('hidden');

    // Save email locally
    localStorage.setItem('loggedInUser', email);

    // Send user to the task board
    window.location.href = 'index.html';
  });
}

// -------------------------------------------
// BOARD ACCESS CHECK
// -------------------------------------------

// Only run this check if we're on index.html
const isIndexPage =
  window.location.pathname.endsWith('index.html') ||
  window.location.pathname.endsWith('/');

if (isIndexPage) {
  const loggedInUser = localStorage.getItem('loggedInUser');

  if (!loggedInUser) {
    window.location.href = 'login.html';
  }
}

// -------------------------------------------
// LOGOUT
// -------------------------------------------

const logoutBtn = document.getElementById('logoutBtn');

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
  });
}