from django.urls import path

from .views import (
    ScaleConfigListCreateView,
    ScaleConfigRetrieveUpdateDestroyView,
    EmergyCalculationView,
    EmergyCalculationListView,
    EmergyCalculationDetailView
)

urlpatterns = [
    path('config/', ScaleConfigListCreateView.as_view(), name='scale-config-list-create'),
    path('config/<int:pk>/', ScaleConfigRetrieveUpdateDestroyView.as_view(), name='scale-config-detail'),
    path('emergy/calculate/', EmergyCalculationView.as_view(), name='emergy-calc'),
    path('emergy/calculations/',EmergyCalculationListView.as_view(), name='emergy-list'),
    path('emergy/calculations/<int:pk>/', EmergyCalculationDetailView.as_view(), name='emergy-detail'),
]
