from django.db import models

# Create your models here.
class TodoDB(models.Model):
    todo_title=models.CharField(max_length=100)
    todo_content=models.TextField()