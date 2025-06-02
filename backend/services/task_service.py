import json

KEY_TASKS = 'tasks'

class TaskService:
    def __init__(self, redis):
        self.redis = redis

    def create_task(self, task_data):
        new_task = {
            **task_data,
            'id': self.__get_next_task_id()
        }

        tasks = [new_task] + self.get_tasks()

        self.__set_tasks(tasks)

    def delete_task(self, task_id):
        tasks = self.get_tasks()
        if not self.__task_exists(tasks, task_id): return False

        filtered_tasks = list(filter(lambda task: task['id'] != int(task_id), tasks))

        self.__set_tasks(filtered_tasks)

        return True

    def get_tasks(self):
        tasks_json = self.redis.get(KEY_TASKS)

        return json.loads(tasks_json) if tasks_json else []

    def update_task(self, task_id, task_data):
        tasks = self.get_tasks()
        if not self.__task_exists(tasks, task_id): return False

        updated_task = {
            **task_data,
            'id': int(task_id) # prevent modification of ID
        }

        updated_tasks = [updated_task if task['id'] == int(task_id) else task for task in tasks]

        self.__set_tasks(updated_tasks)

        return True

    def __task_exists(self, tasks, task_id) -> bool:
        return int(task_id) in [task['id'] for task in tasks]

    def __get_next_task_id(self):
        return self.redis.incr('task_id')

    def __set_tasks(self, tasks):
        self.redis.set(KEY_TASKS, json.dumps(tasks))
