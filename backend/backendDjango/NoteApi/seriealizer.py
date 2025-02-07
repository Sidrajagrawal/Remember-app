from rest_framework import serializers
from .models import NoteDB

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model=NoteDB
        fields="__all__"
        