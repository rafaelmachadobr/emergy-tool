import io

import pandas as pd

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, parsers

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from django.db import transaction

from .models import LCIMatrix, LCICell

class UploadMatrixAPIView(APIView):
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]

    upload_file_param = openapi.Parameter(
        name='file',
        in_=openapi.IN_FORM,
        type=openapi.TYPE_FILE,
        description='Arquivo CSV/XLSX da matriz LCI',
        required=True,
    )

    upload_name_param = openapi.Parameter(
        name='name',
        in_=openapi.IN_FORM,
        type=openapi.TYPE_STRING,
        description='Nome da matriz',
        required=True,
    )

    @swagger_auto_schema(manual_parameters=[upload_name_param, upload_file_param])
    def post(self, request, format=None):
        file = request.FILES.get('file')
        name = request.data.get('name')

        if not file or not name:
            return Response({'error': 'Campos "name" e "file" são obrigatórios'}, status=status.HTTP_400_BAD_REQUEST)

        ext = file.name.split('.')[-1].lower()
        try:
            if ext in ['xls', 'xlsx']:
                df = pd.read_excel(file)
            elif ext == 'csv':
                content = file.read()
                try:
                    df = pd.read_csv(io.StringIO(content.decode('utf-8')), sep=';', engine='python')
                except Exception:
                    df = pd.read_csv(io.StringIO(content.decode('utf-8')), sep=',', engine='python')
            else:
                return Response({'error': 'Formato de arquivo não suportado'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': f'Erro ao ler o arquivo: {e}'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            with transaction.atomic():
                matrix = LCIMatrix.objects.create(name=name)
                print(f'Matriz criada: {matrix} (ID: {matrix.pk})')

                for i, row in df.iterrows():
                    processo = row[df.columns[0]]
                    for col in df.columns[1:]:
                        valor = row[col]
                        LCICell.objects.create(
                            matrix=matrix,
                            row=str(processo),
                            column=str(col),
                            value=str(valor)
                        )

        except Exception as e:
            print(f'Erro ao salvar a matriz ou células: {e}')
            return Response({'error': f'Erro ao salvar a matriz ou células: {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'status': 'Matriz salva com sucesso', 'matrix_id': matrix.pk}, status=status.HTTP_201_CREATED)