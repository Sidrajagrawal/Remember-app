from django.shortcuts import render
from .models import NoteDB
from .seriealizer import NoteSerializer
from rest_framework import generics
# Create your views here.

class NoteDetail(generics.ListCreateAPIView):
    queryset=NoteDB.objects.all()
    serializer_class=NoteSerializer

class pkbased(generics.RetrieveUpdateDestroyAPIView):
    queryset=NoteDB.objects.all()
    serializer_class=NoteSerializer
