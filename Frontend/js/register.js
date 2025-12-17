const form = document.getElementById("registerForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/auth/register/",
      {
        username,
        password
      }
    );

    // show API success message
    message.innerText = response.data.message || "Registered successfully";
    message.className = "text-success";

    // 🔁 redirect to login after 1.5 seconds
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);

  } catch (error) {
    if (error.response && error.response.data) {
      message.innerText = Object.values(error.response.data)
        .flat()
        .join(", ");
      message.className = "text-danger";
    } else {
      message.innerText = "Server not reachable";
      message.className = "text-danger";
    }
  }
});
