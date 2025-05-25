from django.db import models
from django.contrib.auth.models import User

class ScaleConfig(models.Model):
    name = models.CharField(max_length=100)
    config = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'scale_config'