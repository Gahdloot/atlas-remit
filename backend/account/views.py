import base64
import uuid
from django.core.files.base import ContentFile
from rest_framework import generics

from helpers.upload_to_s3 import upload_base64_to_s3
from helpers.response import success_response,bad_request_response

from account.serializers import SchoolPaymentRequestSerializer




class SchoolPaymentRequestCreateView(generics.GenericAPIView):
    """
    API view to create a new school payment request
    """
    serializer_class = SchoolPaymentRequestSerializer
    permission_classes = []

    def post(self, request):
        data = request.data.copy() 
        key_to_upload = ['student_document', 'payer_id_document','payment_receipt']

        for key in key_to_upload:
            base64_data = data.get(key)
            if base64_data and isinstance(base64_data, str) and base64_data.startswith("data:"):
                try:
                    file_url = self._handle_base64_upload(base64_data, key)
                    data[key] = file_url  
                except Exception as e:
                    return bad_request_response(message=f"Failed to upload document")

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        payment_request = serializer.save()

        return success_response(
            data={
                'id': payment_request.id,
                'name': payment_request.name,
                'payment_status': payment_request.payment_status,
                'created_at': payment_request.created_at
            }
        )

    def _handle_base64_upload(self, base64_string, file_prefix):
        """
        Converts base64 string to file and uploads to S3. Returns S3 file URL.
        """
        format, imgstr = base64_string.split(';base64,')
        ext = format.split('/')[-1]
        file_name = f"{file_prefix}_{uuid.uuid4().hex}.{ext}"
        file_content = ContentFile(base64.b64decode(imgstr), name=file_name)

        file_url = upload_base64_to_s3(file_content, file_name)

        return file_url
