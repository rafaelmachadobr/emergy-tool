from django.db import models
from django.contrib.auth.models import User

from lci.models import LCIMatrix

class ScaleConfig(models.Model):
    name = models.CharField(max_length=100)
    config = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'scale_config'

class EmergyCalculation(models.Model):
    matrix = models.ForeignKey("lci.LCIMatrix", on_delete=models.CASCADE)
    scale_config = models.ForeignKey("scale_config.ScaleConfig", on_delete=models.CASCADE)
    useful_product = models.FloatField()
    results = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"EmergyCalculation #{self.id} - Matrix {self.matrix.id}"