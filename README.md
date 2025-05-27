# To-Do List App

A simple To-Do List app with a React frontend and a Python backend. The backend API is built in Flask and uses Redis for storage.

## API

### Task Schema

```Javascript
{
  id: number,
  title: string,
  description: string,
  completedAt: Date,
  createdAt: Date
}
```

### Routes

#### GET /api/tasks
- Returns a list of all tasks

#### POST /api/tasks
  - Creates a new task
  - Accepts application/json with task data
  - Returns an updated list of tasks

#### PUT /api/tasks/<task_id>
  - Updates the task at the given ID
  - Accepts application/json with task data
  - Returns an updated list of tasks

#### DELETE /api/tasks/<task_id>
  - Deletes the task with the given ID
  - Returns an updated list of tasks

## Developing

### Install Frontend
Prerequisites: Node v18+

1. `cd frontend`
2. `npm install`

### Install Backend
Prerequisites: Python

**Note**: *The backend API runs on port 4000. If you need to change this for your dev environment, modify the `API_PORT` variable in `backend/api.py`, and set the `VITE_API_PORT` environment variable in `frontend/.env` to match.*

### Start Frontend
1. `cd frontend`
2. `npm run dev`

### Start Backend
1. `cd backend`
2. `source start.sh`

### Run Frontend Tests
1. `cd frontend`
2. `npm run test`