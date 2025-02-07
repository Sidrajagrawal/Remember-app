from django.shortcuts import render
from .models import TodoDB
from .seriealizer import TodoSerializer
from rest_framework import generics
# Create your views here.

class TodoDetail(generics.ListCreateAPIView):
    queryset=TodoDB.objects.all()
    serializer_class=TodoSerializer

class pkbasedTodo(generics.RetrieveUpdateDestroyAPIView):
    queryset=TodoDB.objects.all()
    serializer_class=TodoSerializer