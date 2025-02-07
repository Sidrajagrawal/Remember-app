from django.urls import path
from .views import TodoDetail ,pkbasedTodo

urlpatterns = [
    path('detail/',TodoDetail.as_view()),
    path('detail/<str:pk>',pkbasedTodo.as_view()),
]
