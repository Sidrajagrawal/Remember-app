from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('note/', include('NoteApi.urls')),
    path('todo/', include('TodoApi.urls')),
]
