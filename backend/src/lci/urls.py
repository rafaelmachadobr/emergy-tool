from django.urls import path

from .views import UploadMatrixAPIView

urlpatterns = [
    path('upload/', UploadMatrixAPIView.as_view(), name='upload_matrix'),
]