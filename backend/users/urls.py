from django.urls import path

from .views import UserList

urlpatterns = [
    path("example", UserList.as_view()),
]
