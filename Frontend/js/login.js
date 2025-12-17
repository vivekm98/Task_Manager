const loginForm = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  errorMsg.innerText = ""; // clear old error

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/auth/login/",
      { username, password }
    );

    // Save tokens
    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);

    // Redirect to dashboard
    window.location.href = "index.html";

  } catch (error) {
    if (error.response?.data?.detail) {
      errorMsg.innerText = error.response.data.detail;
    } else {
      errorMsg.innerText = "Login failed. Try again.";
    }
  }
});
