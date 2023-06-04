from django.apps import AppConfig
from django.conf import settings
from django.db.models.signals import post_migrate


def link_social_apps_to_site(sender, **kwargs):
    from allauth.socialaccount.models import SocialApp
    from django.contrib.sites.models import Site

    site = Site.objects.get(id=settings.SITE_ID)

    for social_app in SocialApp.objects.all():
        if site not in social_app.sites.all():
            social_app.sites.add(site)


class AuthenticationConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "authentication"

    def ready(self):
        post_migrate.connect(link_social_apps_to_site, sender=self)
