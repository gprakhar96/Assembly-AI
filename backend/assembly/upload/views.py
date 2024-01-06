import os
# from django.core.files.base import ContentFile
# from django.core.files.storage import default_storage
from django.http import HttpResponse
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

        # pathg = default_storage.save('temp.pdf', ContentFile(manual_pdf.read()))
        # tmp_file = os.path.join(default_storage.location, path)

        # print(tmp_file)
        # doc = DocumentArray.from_files(tmp_file)
        # print(type(doc))
        resp={}
        resp['message']='{} file received'.format(manual_pdf.name)
        print(resp)
        return HttpResponse(json.dumps(resp),content_type="application/json")
        # return HttpResponse('{} file received'.format(manual_pdf.name))
    print("not okay")
    return HttpResponse('Invalid file type', status=400)
