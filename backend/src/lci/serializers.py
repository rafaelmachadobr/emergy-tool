from rest_framework import serializers

from .models import LCIMatrix, LCICell

class LCICellSerializer(serializers.ModelSerializer):
    class Meta:
        model = LCICell
        fields = ['id', 'row', 'column', 'value']

class LCIMatrixSerializer(serializers.ModelSerializer):
    cells = LCICellSerializer(many=True)

    class Meta:
        model = LCIMatrix
        fields = ['id', 'name', 'uploaded_at', 'cells']
    

    def update(self, instance, validated_data):
        cells_data = validated_data.pop('cells', [])
        instance.name = validated_data.get('name', instance.name)
        instance.save()

        existing_ids = [c.id for c in instance.cells.all()]
        received_ids = []

        for cell_data in cells_data:
            cell_id = cell_data.get('id', None)
            if cell_id:
                received_ids.append(cell_id)
                cell = LCICell.objects.get(id=cell_id, matrix=instance)
                for attr, value in cell_data.items():
                    setattr(cell, attr, value)
                cell.save()
            else:
                LCICell.objects.create(matrix=instance, **cell_data)

        for cid in existing_ids:
            if cid not in received_ids:
                LCICell.objects.filter(id=cid, matrix=instance).delete()

        return instance

