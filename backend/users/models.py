from django.contrib.auth.models import AbstractUser
from django.db.models import CharField
from django.utils.translation import gettext_lazy as _
from model_utils.models import TimeStampedModel


class User(AbstractUser):
    """
    Default custom user model.
    """


class UserProfile(TimeStampedModel):
    """
    Users's detailed information.
    """

    name = CharField(_("Name of User"), blank=True, max_length=255)
