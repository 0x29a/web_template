"""
Creates admin user for development purposes
"""

from django.conf import settings
from django.db import migrations


def load_initial_data(apps, schema_editor):
    User = apps.get_model("users", "User")
    User.objects.create_superuser(
        email="admin@example.com",
        username="admin",
        password="admin",
    )

class Migration(migrations.Migration):
    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = []

    if settings.DEBUG:
        operations.append(
            migrations.RunPython(load_initial_data),
        )
