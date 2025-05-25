from rest_framework import generics
from drf_yasg.utils import swagger_auto_schema
from .models import ScaleConfig
from .serializers import ScaleConfigSerializer

class ScaleConfigListCreateView(generics.ListCreateAPIView):
    serializer_class = ScaleConfigSerializer

    def get_queryset(self):
        return ScaleConfig.objects.filter()

    @swagger_auto_schema(operation_summary="Listar configurações", operation_description="Lista as configurações criadas pelo usuário")
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    @swagger_auto_schema(operation_summary="Criar configuração", operation_description="Cria uma nova configuração de transformidade")
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class ScaleConfigRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ScaleConfig.objects.all()
    serializer_class = ScaleConfigSerializer

    @swagger_auto_schema(operation_summary="Obter uma configuração", operation_description="Recupera os dados de uma configuração de escala pelo ID.")
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    @swagger_auto_schema(operation_summary="Atualizar uma configuração", operation_description="Atualiza os dados da configuração especificada.")
    def put(self, request, *args, **kwargs):
        return super().put(request, *args, **kwargs)

    @swagger_auto_schema(operation_summary="Deletar uma configuração", operation_description="Deleta a configuração de escala informada pelo ID.")
    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)
