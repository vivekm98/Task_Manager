
const taskForm = document.getElementById("taskForm");
const tasksList = document.getElementById("tasksList");
const logoutBtn = document.getElementById("logoutBtn");

// Filter & Pagination state
let currentPage = 1;
let currentFilter = "all";

// ---------------------- Auth Check ----------------------
const accessToken = localStorage.getItem("access");
if (!accessToken) {
  window.location.href = "login.html";
}

// ---------------------- Axios Instance ----------------------
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/auth/",
  headers: { Authorization: `Bearer ${accessToken}` },
});

// ---------------------- Logout ----------------------
logoutBtn?.addEventListener("click", () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  window.location.href = "login.html";
});

// ---------------------- Filters ----------------------
document.getElementById("filterAll")?.addEventListener("click", () => {
  currentFilter = "all"; currentPage = 1; fetchTasks();
});
document.getElementById("filterCompleted")?.addEventListener("click", () => {
  currentFilter = "completed"; currentPage = 1; fetchTasks();
});
document.getElementById("filterPending")?.addEventListener("click", () => {
  currentFilter = "pending"; currentPage = 1; fetchTasks();
});

// ---------------------- Display Tasks ----------------------
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
      <div>
        <button class="btn btn-sm btn-primary me-2">Edit</button>
        <button class="btn btn-sm btn-danger">Delete</button>
      </div>
    `;

    // Checkbox toggle
    taskCard.querySelector('input[type="checkbox"]').addEventListener("change", async (e) => {
      try {
        await api.patch(`tasks/${task.id}/`, { status: e.target.checked });
        fetchTasks();
      } catch (err) { console.error(err); }
    });

    // Edit button
    taskCard.querySelector("button.btn-primary").addEventListener("click", () => {
      window.location.href = `update.html?id=${task.id}`;
    });

    // Delete button
    taskCard.querySelector("button.btn-danger").addEventListener("click", async () => {
      if (confirm("Are you sure you want to delete this task?")) {
        try { 
          await api.delete(`tasks/${task.id}/`); 
          fetchTasks(); 
        } catch (err) { console.error(err); }
      }
    });

    tasksList.appendChild(taskCard);
  });
};

// ---------------------- Pagination ----------------------
const setupPagination = (data) => {
  const pagination = document.getElementById("pagination");
  if (!pagination) return;

  pagination.innerHTML = "";

  const totalTasks = data.count || 0;
  const pageSize = 5; // backend page size
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

// ---------------------- Fetch Tasks ----------------------
const fetchTasks = async () => {
  try {
    let url = `tasks/?page=${currentPage}`;
    if (currentFilter !== "all") url += `&status=${currentFilter}`;
    
    const res = await api.get(url);
    displayTasks(res.data.results);
    setupPagination(res.data);
  } catch (err) {
    console.error(err);
    tasksList.innerHTML = `<p class="text-danger">Failed to load tasks</p>`;
  }
};

// ---------------------- Add Task ----------------------
taskForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  if (!title) return;

  try {
    await api.post("tasks/", { title, description });
    taskForm.reset();
    fetchTasks();
  } catch (err) { console.error(err); }
});



// ---------------------- Axios Interceptor (Refresh Token) ----------------------
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status === 401) {
      const refreshToken = localStorage.getItem("refresh");
      if (refreshToken) {
        try {
          const res = await axios.post("http://127.0.0.1:8000/api/auth/token/refresh/", { refresh: refreshToken });
          localStorage.setItem("access", res.data.access);
          error.config.headers['Authorization'] = `Bearer ${res.data.access}`;
          return axios(error.config);
        } catch {
          window.location.href = "login.html";
        }
      } else {
        window.location.href = "login.html";
      }
    }
    return Promise.reject(error);
  }
);

// ---------------------- Initial Fetch ----------------------
fetchTasks();
