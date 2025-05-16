from flask import Flask, request
from flask_cors import CORS
from redis import Redis
import json

KEY_TASKS = 'tasks'

redis = Redis(host='localhost', port=6379, decode_responses=True)
app = Flask(__name__)
CORS(app)

def getNextTaskId():
    return redis.incr('task_id')

def getStoredTasks():
    tasks_json = redis.get(KEY_TASKS)

    return json.loads(tasks_json) if tasks_json else []

def setTasks(tasks):
    redis.set(KEY_TASKS, json.dumps(tasks))

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    tasks = getStoredTasks()

    return tasks, 200

@app.route('/api/tasks', methods=['POST'])
def create_task():
    task_data = request.get_json()
    new_task = {
        **task_data,
        'id': getNextTaskId()
    }

    tasks = [new_task] + getStoredTasks()

    setTasks(tasks)

    return tasks, 201

@app.route('/api/tasks/<task_id>', methods=['PUT'])
def update_task(task_id):
    updated_task_data = request.get_json()
    updated_task = {
        **updated_task_data,
        id: int(task_id) # prevent modification of ID
    }

    tasks = getStoredTasks()

    updated_tasks = [updated_task if task['id'] == int(task_id) else task for task in tasks]

    setTasks(updated_tasks)

    return updated_tasks, 200

@app.route('/api/tasks/<task_id>', methods=['DELETE'])
def delete_task(task_id):
    tasks = getStoredTasks()
    filteredTasks = list(filter(lambda task: task['id'] != int(task_id), tasks))

    setTasks(filteredTasks)

    return filteredTasks, 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=4000)
