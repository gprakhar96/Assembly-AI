from django.http import HttpResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt


# Create your views here.


@require_POST
@csrf_exempt
def upload_view(request):
    manual_pdf = request.FILES.get('manual_pdf')
    if manual_pdf and manual_pdf.content_type == 'application/pdf':
        # Process the PDF file
        return HttpResponse('{} file received'.format(manual_pdf.name))
    return HttpResponse('Invalid file type', status=400)
