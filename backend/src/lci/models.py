from django.db import models

class LCIMatrix(models.Model):
    name = models.CharField(max_length=100)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class LCICell(models.Model):
    matrix = models.ForeignKey(LCIMatrix, on_delete=models.CASCADE, related_name='cells')
    row = models.CharField(max_length=100)
    column = models.CharField(max_length=100)
    value = models.CharField(max_length=100)
