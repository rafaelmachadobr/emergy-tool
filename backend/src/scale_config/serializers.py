from rest_framework import serializers
from .models import ScaleConfig

class ScaleConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScaleConfig
        fields = ['id', 'name', 'config', 'created_at']
