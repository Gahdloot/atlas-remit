import base64
import time
import uuid
from django.core.files.base import ContentFile
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from rest_framework import generics, status
from rest_framework.response import Response
from datetime import datetime, timedelta
import secrets
import string

from account.models.payment_request import SchoolPaymentRequest, SchoolPaymentRequestInitializer
from account.serializers import PaymentTackingSerializer, SchoolPaymentRequestSerializer
from helpers.response import bad_request_response, success_response
from helpers.upload_to_s3 import upload_base64_to_s3

# Your existing view

class WelcomeTestEmailView(generics.GenericAPIView):
    """
    API view to send welcome email to new users
    """
    permission_classes = []

    def get(self, request):
        return success_response(data={"olakau":90})





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
                # 'payment_status': payment_request.payment_status,
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


class TractPaymentView(generics.GenericAPIView):
    """
    API view to create a new school payment request
    """
    serializer_class = PaymentTackingSerializer
    permission_classes = []

    def post(self, request):
        data = request.data.copy() 
        key_to_upload = ['student_document', 'payer_id_document','payment_receipt']

        return success_response(
            data={ }
        )


# 

class WelcomeEmailView(generics.GenericAPIView):
    """
    API view to send welcome email to new users
    """
    permission_classes = []

    def post(self, request):
        email = request.data.get('email')
        
        if not email:
            return bad_request_response(message="Email address is required")

        try:
            initializer = SchoolPaymentRequestInitializer.objects.create(email=email)
            # Send welcome email
            subject = "Welcome to School Payment System"
            time.sleep(2)
            # from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', 'noreply@schoolpayment.com')
            
            # send_mail(
            #     subject=subject,
            #     message=message,
            #     from_email=from_email,
            #     recipient_list=[email],
            #     fail_silently=False,
            # )
            print(str(initializer.id))
            return success_response(
                message="Welcome email sent successfully",
                data={'email': email, 'sent_at': timezone.now(),'initializer':str(initializer.id)}
            )

        except Exception as e:
            return bad_request_response(message="Failed to send welcome email")


class ResendEmailView(generics.GenericAPIView):
    """
    API view to resend emails (welcome or notification emails)
    """
    permission_classes = []

    def post(self, request):
        email = request.data.get('email')
        email_type = request.data.get('type', 'welcome')  # welcome, notification, etc.
        
        if not email:
            return bad_request_response(message="Email address is required")

        try:
            if email_type == 'welcome':
                subject = "Welcome to School Payment System - Resent"
                message = f"""
                Dear User,

                This is a resent welcome email for our School Payment System!

                You can now access all features of our platform:
                - Submit payment requests
                - Track payments
                - Upload documents
                - Receive confirmations

                Best regards,
                School Payment Team
                """
            else:
                subject = "School Payment System Notification"
                message = f"""
                Dear User,

                This is a notification from our School Payment System.

                Please log in to your account to check for any updates or required actions.

                Best regards,
                School Payment Team
                """

                time.sleep(2)
            # from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', 'noreply@schoolpayment.com')
            
            # send_mail(
            #     subject=subject,
            #     message=message,
            #     from_email=from_email,
            #     recipient_list=[email],
            #     fail_silently=False,
            # )

            return success_response(
                message=f"{email_type.title()} email resent successfully",
                data={'email': email, 'type': email_type, 'sent_at': timezone.now()}
            )

        except Exception as e:
            return bad_request_response(message="Failed to resend email")


class OneTimeVirtualAccountView(generics.GenericAPIView):
    """
    API view to generate one-time virtual account for payments
    """
    permission_classes = []

    def post(self, request):
        payment_request_id = request.data.get('payment_request_id')
        amount = request.data.get('amount')
        
        if not payment_request_id or not amount:
            return bad_request_response(message="Payment request ID and amount are required")
        

        try:
            payment_request = SchoolPaymentRequest.objects.get(id=payment_request_id)
        except:
            return bad_request_response(
                message=""
            )

        try:
            # Generate virtual account details
            virtual_account_number = self._generate_virtual_account()
            bank_name = "Virtual Bank"
            account_name = f"PAYMENT_{payment_request.student_first_name}"
            
            # Set expiry time (24 hours from now)
            expires_at = timezone.now() + timedelta(hours=24)
            
            # You might want to save this to your database
            virtual_account_data = {
                'account_number': virtual_account_number,
                'account_name': account_name,
                'bank_name': bank_name,
                'amount': float(amount),
                'payment_request_id': payment_request_id,
                'expires_at': expires_at,
                'status': 'active'
            }

            return success_response(
                message="Virtual account generated successfully",
                data=virtual_account_data
            )

        except Exception as e:
            return bad_request_response(message="Failed to generate virtual account")

    def _generate_virtual_account(self):
        """Generate a random virtual account number"""
        return ''.join(secrets.choice(string.digits) for _ in range(10))


class PaymentVerificationView(generics.GenericAPIView):
    """
    API view to verify payment status
    """
    permission_classes = []

    def post(self, request):
        payment_reference = request.data.get('payment_reference')
        transaction_id = request.data.get('transaction_id')
        
        if not payment_reference and not transaction_id:
            return bad_request_response(message="Payment reference or transaction ID is required")

        try:
            

            
            # Simulate payment verification logic
            verification_result = self._verify_payment_with_provider(payment_reference, transaction_id)
            
            if verification_result['status'] == 'success':
                # Update payment status in your database here
                return success_response(
                    message="Payment verified successfully",
                    data={
                        'payment_reference': payment_reference,
                        'transaction_id': transaction_id,
                        'amount': verification_result.get('amount'),
                        'status': 'verified',
                        'verified_at': timezone.now(),
                        'payment_method': verification_result.get('payment_method', 'bank_transfer')
                    }
                )
            elif verification_result['status'] == 'pending':
                return success_response(
                    message="Payment is still pending",
                    data={
                        'payment_reference': payment_reference,
                        'status': 'pending',
                        'message': 'Payment is being processed'
                    }
                )
            else:
                return bad_request_response(
                    message="Payment verification failed",
                    data={
                        'payment_reference': payment_reference,
                        'status': 'failed',
                        'reason': verification_result.get('reason', 'Unknown error')
                    }
                )

        except Exception as e:
            return bad_request_response(message="Failed to verify payment")

    def _verify_payment_with_provider(self, payment_reference, transaction_id):
        """
        Simulate payment verification with external provider
        In real implementation, this would call your payment provider's API
        """
        import random
        
        # Simulate different payment statuses
        statuses = ['success', 'pending', 'failed']
        status = random.choice(statuses)
        
        if status == 'success':
            return {
                'status': 'success',
                'amount': random.uniform(1000, 50000),
                'payment_method': 'bank_transfer'
            }
        elif status == 'pending':
            return {'status': 'pending'}
        else:
            return {
                'status': 'failed',
                'reason': 'Insufficient funds or invalid payment details'
            }


