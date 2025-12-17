const taskForm = document.getElementById("taskForm");
const tasksList = document.getElementById("tasksList");
const logoutBtn = document.getElementById("logoutBtn");

// Pagination & Filter state
let currentPage = 1;
let currentFilter = "all";

// Get token from localStorage
const accessToken = localStorage.getItem("access");
if (!accessToken) {
  window.location.href = "login.html"; // redirect if not logged in
}

// Axios instance with JWT
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/auth/",
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

// Logout
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  window.location.href = "login.html";
});

// Filter buttons
document.getElementById("filterAll")?.addEventListener("click", () => { currentFilter = "all"; currentPage = 1; fetchTasks(); });
document.getElementById("filterCompleted")?.addEventListener("click", () => { currentFilter = "completed"; currentPage = 1; fetchTasks(); });
document.getElementById("filterPending")?.addEventListener("click", () => { currentFilter = "pending"; currentPage = 1; fetchTasks(); });

// Fetch tasks with filter and pagination
const fetchTasks = async () => {
  try {
    let url = `tasks/?page=${currentPage}`;
    if (currentFilter !== "all") url += `&status=${currentFilter}`;

    const response = await api.get(url);

    // Pass tasks array to displayTasks
    displayTasks(response.data.results);

    // Setup pagination
    setupPagination(response.data);
  } catch (error) {
    console.error(error);
    tasksList.innerHTML = `<p class="text-danger">Failed to load tasks</p>`;
  }
};

// Display tasks in DOM
const displayTasks = (tasks) => {
  tasksList.innerHTML = "";

  if (!Array.isArray(tasks) || tasks.length === 0) {
    tasksList.innerHTML = `<p>No tasks found</p>`;
    return;
  }

  tasks.forEach(task => {
    const taskCard = document.createElement("div");
    taskCard.className = "card mb-2 p-3 d-flex justify-content-between align-items-center flex-row";
    taskCard.innerHTML = `
      <div>
        <input type="checkbox" class="form-check-input me-2" ${task.status ? "checked" : ""} data-id="${task.id}">
        <strong>${task.title}</strong> - ${task.description || ""}
      </div>
      <button class="btn btn-sm btn-danger" data-id="${task.id}">Delete</button>
    `;

    // Checkbox toggle
    taskCard.querySelector('input[type="checkbox"]').addEventListener("change", async (e) => {
      const checked = e.target.checked;
      try {
        await api.patch(`tasks/${task.id}/`, { status: checked });
        fetchTasks();
      } catch (err) {
        console.error(err);
      }
    });

    // Delete button
    taskCard.querySelector("button").addEventListener("click", async () => {
      if (confirm("Are you sure you want to delete this task?")) {
        try {
          await api.delete(`tasks/${task.id}/`);
          fetchTasks();
        } catch (err) {
          console.error(err);
        }
      }
    });

    tasksList.appendChild(taskCard);
  });
};

// Setup pagination
const setupPagination = (data) => {
  const pagination = document.getElementById("pagination");
  if (!pagination) return;

  pagination.innerHTML = "";

  const totalTasks = data.count || 0;
  const pageSize = 5; // same as backend
  const totalPages = Math.ceil(totalTasks / pageSize);

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.className = `page-item ${i === currentPage ? "active" : ""}`;
    li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    li.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage = i;
      fetchTasks();
    });
    pagination.appendChild(li);
  }
};

// Create Task
taskForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();

  if (!title) return;

  try {
    await api.post("tasks/", { title, description });
    taskForm.reset();
    fetchTasks();
  } catch (err) {
    console.error(err);
  }
});

// Initial fetch
fetchTasks();

api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status === 401) {
      const refreshToken = localStorage.getItem("refresh");
      if (refreshToken) {
        // call refresh token endpoint
        const res = await axios.post("http://127.0.0.1:8000/api/auth/token/refresh/", { refresh: refreshToken });
        localStorage.setItem("access", res.data.access);
        error.config.headers['Authorization'] = `Bearer ${res.data.access}`;
        return axios(error.config);
      } else {
        window.location.href = "login.html";
      }
    }
    return Promise.reject(error);
    
  }
);

