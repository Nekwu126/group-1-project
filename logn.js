/* ===========================================
   SIMPLE AUTH — email only, no password
   Stores the email in localStorage so index.html
   can check "is someone signed in?"
=========================================== */

const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const errorMsg = document.getElementById('errorMsg');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault(); // stop the page from reloading

  const email = emailInput.value.trim();

  // very basic check: must contain "@" and a "." after it
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!isValidEmail) {
    errorMsg.classList.remove('hidden');
    return;
  }

  errorMsg.classList.add('hidden');

  // "Log in" by saving the email locally
  localStorage.setItem('loggedInUser', email);

  // Send them to the task board
  window.location.href = 'index.html';
});