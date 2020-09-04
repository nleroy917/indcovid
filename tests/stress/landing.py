from locust import HttpLocust, TaskSet, task, between
x
class UserBehaviour(TaskSet):
    def on_start(self):
        """ on_start is called when a Locust start before any task is scheduled """
        pass

class WebsiteUser(HttpLocust):
    task_set = UserBehaviour
    wait_time = between(5, 9)