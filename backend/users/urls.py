from django.urls import include, path

from .views import UserList

urlpatterns = [
    path("example", UserList.as_view()),
]
