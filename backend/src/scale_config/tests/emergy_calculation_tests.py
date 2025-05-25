import pytest
from rest_framework.test import APIClient
from django.urls import reverse
from scale_config.models import ScaleConfig
from lci.models import LCIMatrix, LCICell
from scale_config.models import EmergyCalculation

@pytest.mark.django_db
def test_emergy_calculation_view():
    client = APIClient()

    matrix = LCIMatrix.objects.create(name="Teste Matrix")
    LCICell.objects.create(matrix=matrix, column="Água (L)", value="1000")
    LCICell.objects.create(matrix=matrix, column="Combustível (L)", value="1.2")
    LCICell.objects.create(matrix=matrix, column="Fertilizante (kg)", value="0.5")
    LCICell.objects.create(matrix=matrix, column="Emissões N2O (kg)", value="0.01")

    scale_config = ScaleConfig.objects.create(
        name="Teste Config",
        config={
            "unit": "seJ/kg",
            "transformities": {
                "Água (L)": {"type": "R", "transformity": 2000},
                "Combustível (L)": {"type": "F", "transformity": 480000},
                "Fertilizante (kg)": {"type": "F", "transformity": 150000},
                "Emissões N2O (kg)": {"type": "N", "transformity": 3500000}
            }
        }
    )

    url = reverse("emergy-calc")

    data = {
        "matrix_id": matrix.id,
        "scale_config_id": scale_config.id,
        "useful_product": 1000
    }

    response = client.post(url, data, format='json')

    assert response.status_code == 200
    json_resp = response.json()

    assert "F" in json_resp
    assert "R" in json_resp
    assert "N" in json_resp
    assert "EYR" in json_resp
    assert "ELR" in json_resp
    assert "total_transformity" in json_resp

    expected_F = 0.5 * 150000 + 1.2 * 480000
    expected_R = 1000 * 2000
    expected_N = 0.01 * 3500000
    expected_Y = expected_F + expected_R

    assert abs(json_resp["F"] - expected_F) < 0.01
    assert abs(json_resp["R"] - expected_R) < 0.01
    assert abs(json_resp["N"] - expected_N) < 0.01
    assert abs(json_resp["Y"] - expected_Y) < 0.01

@pytest.mark.django_db
def test_emergy_calculation_list_view():
    client = APIClient()

    matrix = LCIMatrix.objects.create(name="Matrix List")
    scale_config = ScaleConfig.objects.create(name="Config List", config={"unit": "seJ/kg", "transformities": {}})

    for i in range(3):
        EmergyCalculation.objects.create(
            matrix=matrix,
            scale_config=scale_config,
            useful_product=1000 + i,
            results={
                "unit": "seJ/kg",
                "F": i * 10,
                "R": i * 20,
                "N": i * 5,
                "Y": i * 30,
                "EYR": 1 + i,
                "ELR": 0.5 + i,
                "total_transformity": 100 + i
            }
        )

    url = reverse("emergy-list")
    response = client.get(url)

    assert response.status_code == 200
    data = response.json()

    assert isinstance(data, list)
    assert len(data) == 3

    first = data[0]
    assert "useful_product" in first
    assert "results" in first
    assert "created_at" in first

@pytest.mark.django_db
def test_emergy_calculation_detail_view():
    client = APIClient()

    matrix = LCIMatrix.objects.create(name="Matrix Detail")
    scale_config = ScaleConfig.objects.create(name="Config Detail", config={"unit": "seJ/kg", "transformities": {}})

    emergy_calc = EmergyCalculation.objects.create(
        matrix=matrix,
        scale_config=scale_config,
        useful_product=1234,
        results={
            "unit": "seJ/kg",
            "F": 10,
            "R": 20,
            "N": 5,
            "Y": 30,
            "EYR": 2,
            "ELR": 1,
            "total_transformity": 150
        }
    )

    url = reverse("emergy-detail", args=[emergy_calc.id])
    response = client.get(url)

    assert response.status_code == 200
    data = response.json()

    # Verifica se os dados retornados batem
    assert data["id"] == emergy_calc.id
    assert data["useful_product"] == 1234
    assert data["results"]["F"] == 10
    assert data["results"]["R"] == 20
    assert data["results"]["N"] == 5