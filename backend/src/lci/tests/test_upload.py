import io
import pandas as pd

from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile

from rest_framework.test import APITestCase
from rest_framework import status

from lci.models import LCIMatrix, LCICell

class UploadMatrixAPITestCase(APITestCase):
    def setUp(self):

        self.df = pd.DataFrame({
            'Processo': ['Plantio', 'Colheita'],
            'Diesel': [10, 5],
            'Energia': [2, 3]
        })

        csv_buffer = io.StringIO()
        self.df.to_csv(csv_buffer, index=False, sep=';')
        csv_buffer.seek(0)

        self.file = SimpleUploadedFile(
            "matriz.csv",
            csv_buffer.getvalue().encode('utf-8'),
            content_type="text/csv"
        )
        self.url = reverse('upload_matrix')

    def test_upload_csv_matriz(self):
        response = self.client.post(
            self.url,
            {'name': 'Teste Matriz', 'file': self.file},
            format='multipart'
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(LCIMatrix.objects.count(), 1)
        self.assertEqual(LCICell.objects.count(), 4)

        matrix = LCIMatrix.objects.first()
        self.assertEqual(matrix.name, 'Teste Matriz')
