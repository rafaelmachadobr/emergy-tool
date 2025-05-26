import pytest

from django.urls import reverse
from django.utils import timezone

from rest_framework.test import APIClient

from scale_config.models import EmergyCalculation, ScaleConfig
from lci.models import LCIMatrix

from datetime import timedelta

@pytest.mark.django_db
def test_emergy_stats_view():
    client = APIClient()

    matrix1 = LCIMatrix.objects.create(name="Matrix 1")
    matrix2 = LCIMatrix.objects.create(name="Matrix 2")

    scale_config = ScaleConfig.objects.create(name="Config Test", config={"unit": "seJ/kg", "transformities": {}})

    now = timezone.now()
    results1 = {"Y": 1000, "F": 400, "R": 500, "N": 100, "total_transformity": 5.0}
    results2 = {"Y": 2000, "F": 800, "R": 1000, "N": 200, "total_transformity": 4.0}

    calc1 = EmergyCalculation.objects.create(matrix=matrix1, scale_config=scale_config, useful_product=100, results=results1)
    calc2 = EmergyCalculation.objects.create(matrix=matrix2, scale_config=scale_config, useful_product=200, results=results2)

    calc1.created_at = now
    calc1.save(update_fields=['created_at'])

    calc2.created_at = now - timedelta(days=1)
    calc2.save(update_fields=['created_at'])

    url = reverse('emergy-stats')

    response = client.get(url)

    assert response.status_code == 200
    data = response.json()

    assert data["total_calculations"] == 2
    assert data["total_files_imported"] == 2
    assert data["total_emergy_Y"] == 3000

    expected_avg = (5.0 + 4.0) / 2
    assert abs(data["average_efficiency"] - round(expected_avg, 3)) < 0.001

    total_emergy = 400 + 800 + 500 + 1000 + 100 + 200
    assert abs(data["emergy_distribution_percent"]["Fontes Não Renováveis (F)"] - round(1200 / total_emergy * 100, 2)) < 0.01
    assert abs(data["emergy_distribution_percent"]["Fontes Renováveis (R)"] - round(1500 / total_emergy * 100, 2)) < 0.01
    assert abs(data["emergy_distribution_percent"]["Emissões Ambientais (N)"] - round(300 / total_emergy * 100, 2)) < 0.01

    keys = list(data["daily_trends"].keys())
    assert len(keys) == 2
    assert round(data["daily_trends"][now.strftime("%Y-%m-%d")], 3) == 1000
