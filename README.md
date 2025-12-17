Perfect 👍
Here is a **clean, professional `README.md`** for your **Django + JWT Task Management App**.
You can **copy–paste this directly** into `README.md`.

---

```md
# 📝 Task Management System (Django + JWT)

A **Task Management Web Application** built using **Django REST Framework** with **JWT Authentication** and a **vanilla JavaScript + Bootstrap frontend**.

This project supports:
- User registration & login
- JWT access & refresh token authentication
- Task CRUD (Create, Read, Update, Delete)
- Pagination & filtering
- Role-based access (Admin vs User)
- Auto token refresh (Axios interceptor)

---

## 🚀 Features

### 🔐 Authentication
- User registration & login
- JWT authentication (Access + Refresh tokens)
- Auto refresh token handling
- Logout functionality

### ✅ Task Management
- Create, update, delete tasks
- Mark tasks as completed / pending
- Filter tasks by status
- Paginated task list

### 👑 Admin Capabilities
- Admin can view **all users' tasks**
- Normal users can view **only their own tasks**
- Role-based permissions using Django permissions & groups

---

## 🛠️ Tech Stack

### Backend
- Python
- Django
- Django REST Framework
- Simple JWT
- SQLite (default)

### Frontend
- HTML5
- Bootstrap 5
- JavaScript (Vanilla)
- Axios

---

## 📂 Project Structure

```

Task_Manager/
│
├── Backend/
│   ├── task_management/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   ├── asgi.py
│   │
│   ├── task/
│   │   ├── migrations/
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── permissions.py
│   │
│   ├── manage.py
│   └── requirements.txt
│
├── Frontend/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── edit.html
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── auth.js
│   │   ├── index.js
│   │   ├── addTask.js
│   │   └── updateTask.js
│   └── assets/
│
├── screenshots/
│   ├── login.png
│   ├── register.png
│   ├── dashboard.png
│   └── edit_task.png
│
├── README.md
└── .gitignore

````

---

## ⚙️ Backend Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/Task_Manager.git
cd Task_Manager/Backend
````

### 2️⃣ Create Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

### 3️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

### 4️⃣ Apply Migrations

```bash
python manage.py migrate
```

### 5️⃣ Create Superuser

```bash
python manage.py createsuperuser
```

### 6️⃣ Run Server

```bash
python manage.py runserver
```

Backend runs at:

```
http://127.0.0.1:8000/
```

---

## 🌐 Frontend Setup

1. Open the **Frontend folder**
2. Open `login.html` in browser
   *(or use Live Server in VS Code)*

---

## 🔑 API Endpoints

| Method | Endpoint                   | Description   |
| ------ | -------------------------- | ------------- |
| POST   | `/api/auth/register/`      | Register user |
| POST   | `/api/auth/token/`         | Login         |
| POST   | `/api/auth/token/refresh/` | Refresh token |
| GET    | `/api/auth/tasks/`         | List tasks    |
| POST   | `/api/auth/tasks/`         | Create task   |
| PATCH  | `/api/auth/tasks/<id>/`    | Update task   |
| DELETE | `/api/auth/tasks/<id>/`    | Delete task   |

---

## 🧠 Permissions Logic

* **Admin (superuser)** → Can view & manage all tasks
* **Normal user** → Can manage only their own tasks
* Permission handled using custom permission class:

  * `IsOwnerOrAdmin`

---

## 🖼️ Screenshots

### 🔐 Login Page

![Login](screenshots/login.png)

### 📝 Register Page

![Register](screenshots/register.png)

### 📊 Dashboard

![Dashboard](screenshots/dashboard.png)

### ✏️ Edit Task

![Edit Task](screenshots/edit_task.png)

---

## 📌 Future Improvements

* Role-based UI
* Task priority
* Due dates
* Search functionality
* React frontend

---

## 👨‍💻 Author

**Vivek More**
Python Full Stack Developer

---

## ⭐ Support

If you like this project:

* ⭐ Star the repository
* 🍴 Fork it
* 🧑‍💻 Contribute

---

```
```

