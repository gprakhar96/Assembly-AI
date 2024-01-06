import os
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import json
# Create your views here.


@require_POST
@csrf_exempt
def upload_view(request):
    manual_pdf = request.FILES.get('manual_pdf')

    if manual_pdf and manual_pdf.content_type == 'application/pdf':
        print("oK")

        path = default_storage.save('temp.pdf', ContentFile(manual_pdf.read()))
        tmp_file = os.path.join(default_storage.location, path)

        resp = {}
        resp['message'] ='{} file received'.format(manual_pdf.name)
        # print(resp)
        return HttpResponse(json.dumps(resp),content_type="application/json")
    print("not okay")
    return HttpResponse('Invalid file type', status=400)



@csrf_exempt 
def querry_view(request):
    if request.method == 'POST':
        try:
            # Expecting data is sent as JSON in the request body
            data = json.loads(request.body.decode('utf-8'))

            # Extract data from the request as needed
            # For example, if the JSON data has a key 'querry', access it like:
            my_data = data.get('querry')

            # My processing logic here...

            print(my_data)
            response_data = {'message': my_data}
            return JsonResponse(response_data, status=200)
        except json.JSONDecodeError as e:
            error_message = {'error': 'Invalid JSON format'}
            return JsonResponse(error_message, status=400)

    else:
        # Return a method not allowed response for other HTTP methods
        return JsonResponse({'error': 'Method not allowed'}, status=405)

