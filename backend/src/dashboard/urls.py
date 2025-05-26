from django.urls import path

from .views import EmergyStatsView

urlpatterns = [
    path('emergy/stats/', EmergyStatsView.as_view(), name='emergy-stats'),
]
