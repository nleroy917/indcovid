import time
from locust import HttpUser, task, between

class QuickstartUser(HttpUser):
    wait_time = between(1, 2)

    @task
    def index_page(self):
        self.client.get("/data/covid/demographics")
        self.client.get("/data/covid/access-to-care")
        self.client.get("/data/covid/mental-health")
