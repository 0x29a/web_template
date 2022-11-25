import logging

import firebase_admin
from django.conf import settings
from django.contrib.auth import get_user_model
from firebase_admin import auth, credentials
from rest_framework import authentication, exceptions, status
from rest_framework.exceptions import APIException
from rest_framework.permissions import IsAuthenticated

logger = logging.getLogger()

cred = credentials.Certificate(settings.GOOGLE_CREDENTIALS)
default_app = firebase_admin.initialize_app(cred)

User = get_user_model()


class NoAuthToken(APIException):
    status_code = status.HTTP_401_UNAUTHORIZED
    default_detail = "No authentication token provided"
    default_code = "no_auth_token"


class InvalidAuthToken(APIException):
    status_code = status.HTTP_401_UNAUTHORIZED
    default_detail = "Invalid authentication token provided"
    default_code = "invalid_token"


class FirebaseError(APIException):
    status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
    default_detail = "The user provided with the auth token is not a valid Firebase user, it has no Firebase UID"
    default_code = "no_firebase_uid"


class FirebaseAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        id_token = request.META.get("HTTP_AUTHORIZATION")
        if not id_token:
            return None

        decoded_token = None
        try:
            decoded_token = auth.verify_id_token(id_token)
        except Exception as e:
            logger.exception(e)

        if not decoded_token:
            return None

        uid = decoded_token.get("uid")
        try:
            user = User.objects.get(username=uid)
        except User.DoesNotExist:
            raise exceptions.AuthenticationFailed("The user does not exist")

        return (user, None)


class FirebaseAuthMixin:
    permission_classes = (IsAuthenticated,)
    authentication_classes = (FirebaseAuthentication,)
