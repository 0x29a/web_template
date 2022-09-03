from django.conf import settings
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path(
        "backend/",
        include(
            [
                path("admin/", admin.site.urls),
                path("auth/", include("dj_rest_auth.urls")),
                path("auth/registration/", include("dj_rest_auth.registration.urls")),
            ]
        ),
    )
]

if not settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
