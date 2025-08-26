import json

# Create your views here.
import logging

from django.http import HttpResponseBadRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt

logger = logging.getLogger("webhook")


@csrf_exempt
def webhook_receiver(request):
    if request.method != "POST":
        return JsonResponse({"error": "Método não permitido"}, status=400)
    try:
        payload = json.loads(request.body.decode("utf-8"))
    except Exception as e:
        logger.error(f"Erro ao decodificar payload: {e}")
        return JsonResponse({"error": "Payload inválido"}, status=400)
    logger.info(f"Payload recebido: {payload}")
    return JsonResponse(payload)
