import json
from datetime import datetime

KEY_TASKS = 'tasks'

class TaskService:
    def __init__(self, redis):
        self.redis = redis

    def create_task(self, task_data):
        new_task = {
            **task_data,
            'id': self.__get_next_task_id(),
            'createdAt': datetime.now(),
        }

        tasks = [new_task] + self.get_tasks()

        self.__set_tasks(tasks)

    def delete_task(self, task_id):
        tasks = self.get_tasks()

        filtered_tasks = list(filter(lambda task: task['id'] != int(task_id), tasks))

        self.__set_tasks(filtered_tasks)

    def get_tasks(self):
        tasks_json = self.redis.get(KEY_TASKS)

        return json.loads(tasks_json) if tasks_json else []

    def task_exists(self, task_id) -> bool:
        return int(task_id) in [task['id'] for task in self.get_tasks()]

    def update_task(self, task_id, task_data):
        tasks = self.get_tasks()

        updated_task = {
            **task_data,
            'id': int(task_id) # prevent modification of ID
        }

        updated_tasks = [updated_task if task['id'] == int(task_id) else task for task in tasks]

        self.__set_tasks(updated_tasks)

    def __get_next_task_id(self):
        return self.redis.incr('task_id')

    def __set_tasks(self, tasks):
        self.redis.set(KEY_TASKS, json.dumps(tasks, default=str))
