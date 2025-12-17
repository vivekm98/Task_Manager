const form = document.getElementById("loginForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/auth/login/",
      { username, password }
    );

    // ✅ Save JWT tokens in localStorage
    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);

    message.innerText = "Login successful";
    message.className = "text-success";

    // 🔁 Redirect to index.html after short delay
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);

  } catch (error) {
    if (error.response && error.response.data) {
      message.innerText = error.response.data.detail;
    } else {
      message.innerText = "Server not reachable";
    }
    message.className = "text-danger";
  }
});
