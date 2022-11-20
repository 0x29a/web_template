from django.conf import settings
from django.contrib import admin
from django.urls import include, path

from users.views import GoogleLogin

urlpatterns = [
    path(
        "backend/",
        include(
            [
                path(settings.ADMIN_URL, admin.site.urls),
                path("auth/", include("dj_rest_auth.urls")),
                path("auth/registration/", include("dj_rest_auth.registration.urls")),
                path("auth/google", GoogleLogin.as_view()),
            ]
        ),
    )
]
