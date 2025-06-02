from flask import Flask, request, jsonify
from flask_cors import CORS
from redis import Redis
from services.task_service import TaskService

API_PORT = 4000

redis = Redis(host='localhost', port=6379, decode_responses=True)
task_service = TaskService(redis)
app = Flask(__name__)
CORS(app)

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    return jsonify(task_service.get_tasks()), 200

@app.route('/api/tasks', methods=['POST'])
def create_task():
    task_data = request.get_json()

    task_service.create_task(task_data)

    return jsonify(task_service.get_tasks()), 201

@app.route('/api/tasks/<task_id>', methods=['PUT'])
def update_task(task_id):
    updated_task_data = request.get_json()

    updated = task_service.update_task(task_id, updated_task_data)

    if not updated:
        return jsonify({'error': 'Task not found'}), 404

    return jsonify(task_service.get_tasks()), 200

@app.route('/api/tasks/<task_id>', methods=['DELETE'])
def delete_task(task_id):
    deleted = task_service.delete_task(task_id)

    if not deleted:
        return jsonify({'error': 'Task not found'}), 404

    return jsonify(task_service.get_tasks()), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=API_PORT)
