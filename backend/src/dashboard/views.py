from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from lci.models import LCIMatrix
from scale_config.models import EmergyCalculation
from collections import defaultdict

class EmergyStatsView(APIView):
    def get(self, request):
        calculations = EmergyCalculation.objects.all()
        total_calculations = calculations.count()
        total_files = LCIMatrix.objects.count()

        total_Y = 0
        total_transformity = 0
        count_transformity = 0

        total_F, total_R, total_N = 0, 0, 0
        trends = defaultdict(float)

        for calc in calculations:
            res = calc.results
            total_Y += res.get("Y", 0)
            F = res.get("F", 0)
            R = res.get("R", 0)
            N = res.get("N", 0)

            total_F += F
            total_R += R
            total_N += N

            tt = res.get("total_transformity")
            if tt:
                total_transformity += tt
                count_transformity += 1

            date_key = calc.created_at.strftime("%Y-%m-%d")
            trends[date_key] += res.get("Y", 0)

        efficiency_avg = total_transformity / count_transformity if count_transformity else 0

        total_emergy = total_F + total_R + total_N
        emergy_distribution = {
            "Fontes Não Renováveis (F)": round((total_F / total_emergy) * 100, 2) if total_emergy else 0,
            "Fontes Renováveis (R)": round((total_R / total_emergy) * 100, 2) if total_emergy else 0,
            "Emissões Ambientais (N)": round((total_N / total_emergy) * 100, 2) if total_emergy else 0,
        }

        return Response({
            "total_calculations": total_calculations,
            "total_files_imported": total_files,
            "total_emergy_Y": total_Y,
            "average_efficiency": round(efficiency_avg, 3),
            "daily_trends": trends,
            "emergy_distribution_percent": emergy_distribution
        }, status=status.HTTP_200_OK)