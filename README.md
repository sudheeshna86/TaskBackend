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
| GET | /api/auth/profile | Get current logged-in user's profile (protected) |

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
cd TaskBackend
npm install
# ensure MongoDB is running and .env is configured
npm run dev
```
Default server URL: `http://localhost:5000`

---

## Test Accounts
Optionally register new accounts or use these seeds if available:

- chandu@gmail.com | Password: 123456
- honey@gmail.com  | Password: 123456

---
## Postman / curl Examples

Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Chandu", "username":"chandu", "email":"chandu@example.com", "password":"123456"}'
```

Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"usernameOrEmail":"chandu", "password":"123456"}'
```

Create Task (replace <TOKEN> with your Bearer token)
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"title":"My Task", "description":"Do something", "priority":"medium", "status":"pending" }'
```

---



## Notes

- All protected routes require a JWT in the request `Authorization` header: `Authorization: Bearer <token>`
- Routes use validators — invalid requests will return `400`.

---

## Contributing

Contributions welcome — open PRs or issues for new features and bug fixes.

---


