"""
Creates allauth.socialaccount.models.SocialApp for Google OAuth2.
"""

import os
from django.db import migrations


def create_social_app(apps, schema_editor):
    from allauth.socialaccount.models import SocialApp

    social_app = SocialApp.objects.get_or_create(
        provider='google',
        name='Google',
        client_id=os.getenv('GOOGLE_CLIENT_ID'),
        secret=os.getenv('GOOGLE_CLIENT_SECRET'),
    )


class Migration(migrations.Migration):
    dependencies = [
        ('socialaccount', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_social_app),
    ]
