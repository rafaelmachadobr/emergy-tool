from django.urls import path, include
from rest_framework.routers import DefaultRouter
from accounts.views import UserViewSet, UserInfoView

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),
    path('user-info/', UserInfoView.as_view(), name='user-info'),
]