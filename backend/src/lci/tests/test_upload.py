import io

import pandas as pd

from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile

from rest_framework.test import APITestCase
from rest_framework import status

from lci.models import LCIMatrix, LCICell

class UploadMatrixAPITestCase(APITestCase):
    def setUp(self):
        df = pd.DataFrame({
            'Processo': ['Plantio', 'Colheita'],
            'Diesel': [10, 5],
            'Energia': [2, 3]
        })

        csv_buffer = io.StringIO()
        df.to_csv(csv_buffer, index=False, sep=';')
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


class MatrixListAPIViewTestCase(APITestCase):
    def setUp(self):
        LCIMatrix.objects.create(name='Matrix 1')
        LCIMatrix.objects.create(name='Matrix 2')

    def test_get_list(self):
        url = reverse('matrix_list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)


class MatrixDetailAPIViewTestCase(APITestCase):
    def setUp(self):
        self.matrix = LCIMatrix.objects.create(name='Matrix Detail')

    def test_get_detail(self):
        url = reverse('matrix_detail', kwargs={'pk': self.matrix.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['name'], 'Matrix Detail')


class MatrixPatchAPIViewTestCase(APITestCase):
    def setUp(self):
        self.matrix = LCIMatrix.objects.create(name="Matriz Original")
        LCICell.objects.create(matrix=self.matrix, row="R1", column="C1", value="10")

    def test_patch_matrix_name(self):
        url = reverse('matrix_update', args=[self.matrix.id])
        payload = {"name": "Matriz Atualizada"}

        response = self.client.patch(url, payload, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['name'], "Matriz Atualizada")

    def test_patch_matrix_with_invalid_data(self):
        url = reverse('matrix_update', args=[self.matrix.id])
        payload = {"name": ""}  # nome vazio deve falhar

        response = self.client.patch(url, payload, format='json')
        self.assertEqual(response.status_code, 400)
        self.assertIn("name", response.data)


class MatrixCellsAPIViewTestCase(APITestCase):
    def setUp(self):
        self.matrix = LCIMatrix.objects.create(name='Matrix Cells')
        LCICell.objects.create(matrix=self.matrix, row='Row1', column='Col1', value='10')
        LCICell.objects.create(matrix=self.matrix, row='Row1', column='Col2', value='20')

    def test_get_cells(self):
        url = reverse('matrix_cells', kwargs={'pk': self.matrix.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]['value'], '10')
        self.assertEqual(response.data[1]['column'], 'Col2')
