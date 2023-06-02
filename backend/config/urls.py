from django.conf import settings
from django.contrib import admin
from django.urls import include, path

backend_urlpatterns = [
    path(settings.ADMIN_URL, admin.site.urls),
    path("auth/", include("dj_rest_auth.urls")),
    path("auth/registration/", include("dj_rest_auth.registration.urls")),
    path("auth/social/", include("authentication.urls")),
    path("users/", include("users.urls")),
]

if settings.DEBUG:
    backend_urlpatterns.append(
        path("__debug__/", include("debug_toolbar.urls")),
    )

urlpatterns = [
    path("backend/", include(backend_urlpatterns)),
]
