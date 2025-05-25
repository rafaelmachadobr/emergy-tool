from django.contrib import admin
from django.urls import path, include

from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# Configuração do Swagger
schema_view = get_schema_view(
    openapi.Info(
        title="API de Usuários",
        default_version='v1',
        description="Documentação da API de Usuários com Swagger",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="samarassk@gmail.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  
    path('api/lci/', include('lci.urls')),
    path('api/', include('accounts.urls')),
    path('api/scale/', include('scale_config.urls')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='swagger'),
]
