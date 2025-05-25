from rest_framework import serializers
from .models import ScaleConfig, EmergyCalculation

class ScaleConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScaleConfig
        fields = ['id', 'name', 'config', 'created_at']

class EmergyCalculationInputSerializer(serializers.Serializer):
    matrix_id = serializers.IntegerField()
    scale_config_id = serializers.IntegerField()
    produto_util = serializers.FloatField()

class EmergyCalculationOutputSerializer(serializers.Serializer):
    Y = serializers.FloatField()
    R = serializers.FloatField()
    N = serializers.FloatField()
    F = serializers.FloatField()
    EYR = serializers.FloatField(allow_null=True)
    ELR = serializers.FloatField(allow_null=True)
    Transformidade_Total = serializers.FloatField(source='Transformidade Total', allow_null=True)

class EmergyCalculationSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergyCalculation
        fields = ['id', 'matrix', 'scale_config', 'useful_product', 'results', 'created_at']