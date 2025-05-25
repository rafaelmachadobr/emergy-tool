from django.urls import path

from .views import UploadMatrixAPIView, MatrixDetailAPIView, MatrixListAPIView, MatrixCellsAPIView,LCIMatrixUpdateAPIView

urlpatterns = [
    path('upload/', UploadMatrixAPIView.as_view(), name='upload_matrix'),
    path('matrices/', MatrixListAPIView.as_view(), name='matrix_list'),
    path('matrices/<int:pk>/', MatrixDetailAPIView.as_view(), name='matrix_detail'),
    path('matrix/<int:pk>/update/', LCIMatrixUpdateAPIView.as_view(), name='matrix_update'),
    path('matrices/<int:pk>/cells/', MatrixCellsAPIView.as_view(), name='matrix_cells'),
]