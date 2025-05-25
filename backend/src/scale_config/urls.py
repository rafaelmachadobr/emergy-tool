from django.urls import path

from .views import (
    ScaleConfigListCreateView,
    ScaleConfigRetrieveUpdateDestroyView
)

urlpatterns = [
    path('config/', ScaleConfigListCreateView.as_view(), name='scale-config-list-create'),
    path('config/<int:pk>/', ScaleConfigRetrieveUpdateDestroyView.as_view(), name='scale-config-detail'),
]
