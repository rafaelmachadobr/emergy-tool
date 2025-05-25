import pytest

from rest_framework.test import APIRequestFactory

from scale_config.models import ScaleConfig
from scale_config.views import ScaleConfigListCreateView, ScaleConfigRetrieveUpdateDestroyView

@pytest.mark.django_db
def test_list_scale_configs():
    factory = APIRequestFactory()
    request = factory.get('/api/scale/config/')
    view = ScaleConfigListCreateView.as_view()
    response = view(request)
    assert response.status_code == 200

@pytest.mark.django_db
def test_create_scale_config():
    factory = APIRequestFactory()
    data = {
        "name": "Teste Create",
        "config": {
            "transformities": {
                "Fertilizante (kg)": 150000
            },
            "unit": "seJ/unit"
        }
    }
    request = factory.post('/api/scale/config/', data, format='json')
    view = ScaleConfigListCreateView.as_view()
    response = view(request)
    assert response.status_code == 201
    assert response.data['name'] == "Teste Create"

@pytest.mark.django_db
def test_retrieve_scale_config():
    obj = ScaleConfig.objects.create(
        name="Teste Retrieve",
        config={"transformities": {"Água (L)": 2000}, "unit": "seJ/unit"}
    )
    factory = APIRequestFactory()
    request = factory.get(f'/api/scale/config/{obj.pk}/')
    view = ScaleConfigRetrieveUpdateDestroyView.as_view()
    response = view(request, pk=obj.pk)
    assert response.status_code == 200
    assert response.data['name'] == "Teste Retrieve"

@pytest.mark.django_db
def test_update_scale_config():
    obj = ScaleConfig.objects.create(
        name="Teste Update",
        config={"transformities": {"Água (L)": 2000}, "unit": "seJ/unit"}
    )
    factory = APIRequestFactory()
    data = {
        "name": "Atualizado",
        "config": {
            "transformities": {
                "Água (L)": 2500
            },
            "unit": "seJ/unit"
        }
    }
    request = factory.put(f'/api/scale/config/{obj.pk}/', data, format='json')
    view = ScaleConfigRetrieveUpdateDestroyView.as_view()
    response = view(request, pk=obj.pk)
    assert response.status_code == 200
    assert response.data['name'] == "Atualizado"

@pytest.mark.django_db
def test_delete_scale_config():
    obj = ScaleConfig.objects.create(
        name="Teste Delete",
        config={"transformities": {"Fertilizante (kg)": 100000}, "unit": "seJ/unit"}
    )
    factory = APIRequestFactory()
    request = factory.delete(f'/api/scale/config/{obj.pk}/')
    view = ScaleConfigRetrieveUpdateDestroyView.as_view()
    response = view(request, pk=obj.pk)
    assert response.status_code == 204
    assert not ScaleConfig.objects.filter(pk=obj.pk).exists()
