// Buttons
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const logoutBtn = document.getElementById("logoutBtn");

// Check JWT token in localStorage
const accessToken = localStorage.getItem("access");

if (accessToken) {
  // user is logged in
  loginBtn.classList.add("d-none");
  registerBtn.classList.add("d-none");
  logoutBtn.classList.remove("d-none");
} else {
  // user is not logged in
  loginBtn.classList.remove("d-none");
  registerBtn.classList.remove("d-none");
  logoutBtn.classList.add("d-none");
}

// Navigate to login/register pages
loginBtn.addEventListener("click", () => {
  window.location.href = "login.html";
});

registerBtn.addEventListener("click", () => {
  window.location.href = "register.html";
});

// Logout
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  window.location.href = "login.html";
});
