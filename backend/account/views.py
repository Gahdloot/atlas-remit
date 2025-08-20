from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db import transaction

from account.models.payment_request import SchoolPaymentRequest
from .serializers import SchoolPaymentRequestSerializer


class SchoolPaymentRequestCreateView(APIView):
    """
    API view to create a new school payment request
    """
    permission_classes = [AllowAny]  # Adjust based on your authentication needs

    def post(self, request):
        """
        Create a new school payment request
        
        Expected payload structure:
        {
            "name": "Payment Request Name",
            "student_first_name": "John",
            "student_last_name": "Doe",
            "student_email": "john.doe@email.com",
            "student_id": "12345",
            "student_id_type": "passport",
            "student_id_expired_at": "2025-12-31",
            "student_document": "https://example.com/student-doc.pdf",
            "country_paying_from": "Nigeria",
            "country_paying_to": "USA",
            "payment_amount": "25000.00",
            "payer": "Jane Doe",
            "payer_id_type": "drivers_license",
            "payer_id_expired_at": "2026-06-30",
            "payer_id_document": "https://example.com/payer-doc.pdf",
            "university": "Harvard University"
        }
        """
        try:
            with transaction.atomic():
                # Set default payment status to pending since user doesn't provide it
                data = request.data.copy()
                data['payment_status'] = 'pending'
                
                serializer = SchoolPaymentRequestSerializer(data=data)
                
                if serializer.is_valid():
                    payment_request = serializer.save()
                    
                    return Response({
                        'success': True,
                        'message': 'Payment request created successfully',
                        'data': {
                            'id': payment_request.id,
                            'name': payment_request.name,
                            'payment_status': payment_request.payment_status,
                            'created_at': payment_request.created_at
                        }
                    }, status=status.HTTP_201_CREATED)
                
                return Response({
                    'success': False,
                    'message': 'Validation failed',
                    'errors': serializer.errors
                }, status=status.HTTP_400_BAD_REQUEST)
                
        except Exception as e:
            return Response({
                'success': False,
                'message': 'An error occurred while processing your request',
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get(self, request):
        """
        Get all payment requests (optional - for admin/listing purposes)
        """
        payment_requests = SchoolPaymentRequest.objects.all().order_by('-created_at')
        serializer = SchoolPaymentRequestSerializer(payment_requests, many=True)
        
        return Response({
            'success': True,
            'data': serializer.data,
            'count': payment_requests.count()
        })


@api_view(['GET'])
@permission_classes([AllowAny])
def get_payment_request(request, payment_id):
    """
    Retrieve a specific payment request by ID
    """
    try:
        payment_request = SchoolPaymentRequest.objects.get(id=payment_id)
        serializer = SchoolPaymentRequestSerializer(payment_request)
        
        return Response({
            'success': True,
            'data': serializer.data
        })
        
    except SchoolPaymentRequest.DoesNotExist:
        return Response({
            'success': False,
            'message': 'Payment request not found'
        }, status=status.HTTP_404_NOT_FOUND)


@api_view(['PATCH'])
@permission_classes([AllowAny])  # Adjust permissions as needed
def update_payment_status(request, payment_id):
    """
    Update payment status (typically used by payment processors or admin)
    
    Expected payload:
    {
        "payment_status": "paid" | "failed",
        "payment_receipt": "https://example.com/receipt.pdf" (optional)
    }
    """
    try:
        payment_request = SchoolPaymentRequest.objects.get(id=payment_id)
        
        # Validate payment status
        valid_statuses = ['pending', 'paid', 'failed']
        new_status = request.data.get('payment_status')
        
        if new_status not in valid_statuses:
            return Response({
                'success': False,
                'message': f'Invalid payment status. Must be one of: {valid_statuses}'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        payment_request.payment_status = new_status
        
        # Add receipt if provided
        if request.data.get('payment_receipt'):
            payment_request.payment_receipt = request.data['payment_receipt']
        
        payment_request.save()
        
        serializer = SchoolPaymentRequestSerializer(payment_request)
        
        return Response({
            'success': True,
            'message': f'Payment status updated to {new_status}',
            'data': serializer.data
        })
        
    except SchoolPaymentRequest.DoesNotExist:
        return Response({
            'success': False,
            'message': 'Payment request not found'
        }, status=status.HTTP_404_NOT_FOUND)
