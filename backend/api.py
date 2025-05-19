from flask import Flask, request
from flask_cors import CORS
from redis import Redis
import json

KEY_TASKS = 'tasks'

redis = Redis(host='localhost', port=6379, decode_responses=True)
app = Flask(__name__)
CORS(app)

def get_next_task_id():
    return redis.incr('task_id')

def get_stored_tasks():
    tasks_json = redis.get(KEY_TASKS)

    return json.loads(tasks_json) if tasks_json else []

def set_tasks(tasks):
    redis.set(KEY_TASKS, json.dumps(tasks))

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    tasks = get_stored_tasks()

    return tasks, 200

@app.route('/api/tasks', methods=['POST'])
def create_task():
    task_data = request.get_json()
    new_task = {
        **task_data,
        'id': get_next_task_id()
    }

    tasks = [new_task] + get_stored_tasks()

    set_tasks(tasks)

    return tasks, 201

@app.route('/api/tasks/<task_id>', methods=['PUT'])
def update_task(task_id):
    updated_task_data = request.get_json()
    updated_task = {
        **updated_task_data,
        'id': int(task_id) # prevent modification of ID
    }

    tasks = get_stored_tasks()

    updated_tasks = [updated_task if task['id'] == int(task_id) else task for task in tasks]

    set_tasks(updated_tasks)

    return updated_tasks, 200

@app.route('/api/tasks/<task_id>', methods=['DELETE'])
def delete_task(task_id):
    tasks = get_stored_tasks()
    filtered_tasks = list(filter(lambda task: task['id'] != int(task_id), tasks))

    set_tasks(filtered_tasks)

    return filtered_tasks, 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=4000)
