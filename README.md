# To-Do List App

A simple To-Do List app with a React frontend and a Python backend. The backend API is built in Flask and uses Redis for storage.

## API

### Task Schema

```Javascript
{
  id: number,
  title: string,
  description: string,
  completedAt: timestamp,
  createdAt: timestamp
}
```

### Endpoints

To simplify the frontend, each endpoint returns a JSON payload with the most up-to-date list of tasks.

Example response:

```javascript
{
  tasks: [
    {
      "id": 1,
      "title": "Task one",
      "description": "A simple task",
      "completedAt": "2025-06-02T17:13:03.379Z",
      "createdAt": "2025-06-02T03:21:25.682Z"
    },
    {
      "id": 2,
      "title": "Task two",
      "description": "",
      "createdAt": "2025-06-02T03:21:25.682Z"
    },
  ]
}
```

#### GET /api/tasks
- Returns the list of all tasks

#### POST /api/tasks
  - Creates a new task
  - Accepts application/json with task data
  - Returns an updated list of tasks

Example request payload:

```javascript
{
  "title": "A new task",
  "description": ""
}
```

#### PUT /api/tasks/<task_id>
  - Updates the task at the given ID
  - Accepts application/json with task data
  - Returns an updated list of tasks

  Example request payload:

```javascript
{
  "title": "An updated task",
  "description": "updated description",
  "completedAt": "2025-06-02T17:13:03.379Z",
  "createdAt": "2025-06-02T03:21:25.682Z"
}
```

#### DELETE /api/tasks/<task_id>
  - Deletes the task with the given ID
  - Returns an updated list of tasks

## Developing

### Install Frontend
Prerequisites: Node v18+

1. `cd frontend`
2. `npm install`

### Install Backend
Prerequisites: Python3, pip

The `start.sh` script will create a virtual environment and automatically install necessary dependencies.

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