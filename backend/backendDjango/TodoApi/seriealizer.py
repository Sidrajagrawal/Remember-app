from .models import TodoDB
from rest_framework import serializers

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model=TodoDB
        fields='__all__'