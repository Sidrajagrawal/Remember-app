from django.db import models

# Create your models here.
class NoteDB(models.Model):
    note_title=models.CharField(max_length=200)
    note_content=models.TextField()
    