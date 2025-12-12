# TaskBackend

Backend API for the Task Manager project. Built using Node.js, Express, and MongoDB (Mongoose). The server provides JWT-based authentication, secure task CRUD routes, and request validation via Zod.

---

## ✨ Features

- User registration / login with JWT
- Protected task endpoints for each user
- Input validation with Zod
- Clean error handling and 404 middleware
- MongoDB database for persistent storage

---

## Folder Structure

```
TaskBackend/
│── controllers/      → Auth, task logic
│── middleware/       → Auth middleware, error handler
│── models/           → Mongoose models (User, Task)
│── routes/           → Express route files (auth, tasks)
│── validators/       → Request Zod schemas
│── config/           → Database connection helper
│── server.js         → Server entry point
│── package.json
```

---

## Tech Stack

- Node.js + Express – Server
- MongoDB + Mongoose – Database and schema layer
- JWT – Authentication tokens
- Zod – Request validation
- dotenv – Environment variable management
- bcryptjs – Password hashing

---
Live Link --Deployed on Render

https://taskbackend-0ar2.onrender.com

## Environment Variables

Create a `.env` file at the `TaskBackend/` root using this template:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/tasksdb
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

---

## API Endpoints

### Auth

| Method | Endpoint | Description |
| ------ | ------- | ----------- |
| POST | /api/auth/register | Register a new user. Body:  |
| POST | /api/auth/login | Login and obtain JWT. Body: ` |

### Tasks (Protected)

| Method | Endpoint | Description |
| ------ | ------- | ----------- |
| GET | /api/tasks | Get tasks for the current user |
| POST | /api/tasks | Create a task. |
| GET | /api/tasks/:id | Get task details by id |
| PUT | /api/tasks/:id | Update task by id |
| DELETE | /api/tasks/:id | Delete task by id |

---

---

## Run Locally

```bash
# clone repo
git clone https://github.com/sudheeshna86/TaskBackend.git
cd TaskBackend
npm install
# ensure MongoDB is running and .env is configured
npm run dev
```
Default server URL: `http://localhost:5000`

---

## Test Accounts
Optionally register new accounts or use these seeds if available:

- demo@gmail.com | Password: 123456
- honey@gmail.com  | Password: 123456

---
## Postman

1. Register a User

Endpoint: POST http://localhost:5000/api/auth/register
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/f4132ac1-1854-4634-a4aa-26fc2cfba8e8" />

2. Login a User

Endpoint: POST http://localhost:5000/api/auth/login
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/9f625e43-5cf0-48c5-b814-a8fa534d9be3" />


3. Creat a task

Endpoint: POST http://localhost:5000/api/tasks
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/ce03604b-fd02-4e47-864f-7bc6e0f6f219" />


4. Get the Task List

Endpoint: Get http://localhost:5000/api/tasks
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/3b5df5e5-1aac-4d2b-9cb9-f34b9680063e" />


5. Update task

Endpoint: Put http://localhost:5000/api/tasks/:id
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/2157b151-6949-4d50-aded-9c70d1aa92a9" />

6.Delete Task

Endpoint: Delete http://localhost:5000/api/tasks/:id
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/b5ed2830-bf60-4149-a123-5dac1848b70a" />




## Notes

- All protected routes require a JWT in the request `Authorization` header: `Authorization: Bearer <token>`
- Routes use validators — invalid requests will return `400`.

---


---


