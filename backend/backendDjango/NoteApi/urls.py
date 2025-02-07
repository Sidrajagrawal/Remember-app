from .views import NoteDetail,pkbased
from django.urls import path

urlpatterns = [
    path("detail/",NoteDetail.as_view()),
    path("detail/<str:pk>",pkbased.as_view())
]
