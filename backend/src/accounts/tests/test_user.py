import pytest

from django.urls import reverse
from rest_framework.test import APIClient
from django.contrib.auth.models import User

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def create_user():
    def _create_user(username, email, password):
        return User.objects.create_user(username=username, email=email, password=password)
    return _create_user

@pytest.mark.django_db
def test_user_registration(api_client):
    url = reverse('user-list') 
    data = {
        'username': 'testuser',
        'email': 'test@example.com',
        'password': '12345678'
    }
    response = api_client.post(url, data)
    assert response.status_code == 201
    assert response.data['username'] == 'testuser'

@pytest.mark.django_db
def test_user_login_and_access(api_client, create_user):
    user = create_user('admin', 'admin@example.com', 'adminpass')
    
    # Login para obter JWT
    response = api_client.post('/api/token/', {
        'username': 'admin',
        'password': 'adminpass'
    })
    assert response.status_code == 200
    token = response.data['access']

    # Autenticando com o token
    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
    users_response = api_client.get(reverse('user-list'))
    assert users_response.status_code == 200
    assert any(u['username'] == 'admin' for u in users_response.data)

@pytest.mark.django_db
def test_user_update(api_client, create_user):
    user = create_user('edituser', 'edit@example.com', 'oldpass')
    
    # Login
    response = api_client.post('/api/token/', {
        'username': 'edituser',
        'password': 'oldpass'
    })
    token = response.data['access']

    # Autenticado
    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
    url = reverse('user-detail', args=[user.id])
    response = api_client.patch(url, {'email': 'new@example.com'})
    assert response.status_code == 200
    assert response.data['email'] == 'new@example.com'
