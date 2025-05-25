from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .models import ScaleConfig, EmergyCalculation
from .serializers import ScaleConfigSerializer, EmergyCalculationSerializer

from lci.models import LCIMatrix, LCICell

class ScaleConfigListCreateView(generics.ListCreateAPIView):
    serializer_class = ScaleConfigSerializer

    def get_queryset(self):
        return ScaleConfig.objects.filter()

    @swagger_auto_schema(operation_description="Lista as configurações criadas pelo usuário")
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    @swagger_auto_schema(operation_description="Cria uma nova configuração de transformidade")
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class ScaleConfigRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ScaleConfig.objects.all()
    serializer_class = ScaleConfigSerializer

    @swagger_auto_schema(operation_description="Recupera os dados de uma configuração de escala pelo ID.")
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    @swagger_auto_schema(operation_description="Atualiza os dados da configuração especificada.")
    def put(self, request, *args, **kwargs):
        return super().put(request, *args, **kwargs)

    @swagger_auto_schema(operation_description="Deleta a configuração de escala informada pelo ID.")
    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)

class EmergyCalculationView(APIView):
    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=["matrix_id", "scale_config_id", "useful_product"],
            properties={
                "matrix_id": openapi.Schema(type=openapi.TYPE_INTEGER, description="ID of the LCI Matrix"),
                "scale_config_id": openapi.Schema(type=openapi.TYPE_INTEGER, description="ID of the Scale Config"),
                "useful_product": openapi.Schema(type=openapi.TYPE_NUMBER, description="Useful product value"),
            },
        ),
        responses={200: "Emergy indicators calculated"},
    )
    def post(self, request):
        matrix_id = request.data.get("matrix_id")
        config_id = request.data.get("scale_config_id")
        useful_product = request.data.get("useful_product")

        if not all([matrix_id, config_id, useful_product]):
            return Response({"error": "All fields are required."}, status=400)

        try:
            matrix = LCIMatrix.objects.get(id=matrix_id)
            config = ScaleConfig.objects.get(id=config_id)
            config_data = config.config
            unit = config_data.get("unit")
            transformities = config_data.get("transformities", {})
            cells = LCICell.objects.filter(matrix=matrix)
        except Exception as e:
            return Response({"error": str(e)}, status=400)

        emergy_by_type = {}

        for cell in cells:
            column_name = cell.column
            column_info = transformities.get(column_name)

            if column_info:
                input_type = column_info.get("type")
                transformity = column_info.get("transformity")

                if transformity is not None and input_type:
                    try:
                        value = float(cell.value)
                        emergy = value * transformity
                        emergy_by_type[input_type] = emergy_by_type.get(input_type, 0) + emergy
                    except ValueError:
                        continue

        F = emergy_by_type.get("F", 0)
        R = emergy_by_type.get("R", 0)
        N = emergy_by_type.get("N", 0)
        Y = F + R

        EYR = Y / F if F else None
        ELR = F / R if R else None
        total_transformity = Y / float(useful_product) if useful_product else None

        results = {
            "unit": unit,
            "F": F,
            "R": R,
            "N": N,
            "Y": Y,
            "EYR": EYR,
            "ELR": ELR,
            "total_transformity": total_transformity
        }

        EmergyCalculation.objects.create(
            matrix=matrix,
            scale_config=config,
            useful_product=useful_product,
            results=results
        )

        return Response(results, status=status.HTTP_200_OK)
    
class EmergyCalculationListView(generics.ListAPIView):
    queryset = EmergyCalculation.objects.all().order_by('-created_at')
    serializer_class = EmergyCalculationSerializer

class EmergyCalculationDetailView(generics.RetrieveAPIView):
    queryset = EmergyCalculation.objects.all()
    serializer_class = EmergyCalculationSerializer