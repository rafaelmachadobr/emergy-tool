from django.contrib.auth.models import User
from accounts.serializers import UserSerializer

from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from rest_framework.views import APIView

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class UserInfoView(APIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Retorna dados do usuário autenticado",
        security=[{'Bearer': []}],
        responses={200: openapi.Response(
            description="Dados do usuário",
            examples={
                "application/json": {
                    "username": "usuario123",
                    "email": "usuario@email.com"
                }
            }
        )}
    )
    def get(self, request):
        user = request.user
        return Response({
            'username': user.username,
            'email': user.email
        })