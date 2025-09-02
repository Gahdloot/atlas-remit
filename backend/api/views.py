# from django.conf import settings
# from django.http import HttpResponse
# from django.views.decorators.csrf import csrf_exempt
# from django.utils.decorators import method_decorator
# from django.db import transaction
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from rest_framework.permissions import AllowAny
# import json
# import logging
# from typing import Dict, Any
# from datetime import datetime
# from django.core.exceptions import ObjectDoesNotExist

# # Import your PalmPay helper class
# from .palmpay_helper import PalmPayCheckout, PalmPayConfig, PalmPayException

# # Import your Django models (adjust these imports based on your models)
# from .models import Order, Payment, Transaction
# from .serializers import OrderSerializer, PaymentSerializer

# logger = logging.getLogger(__name__)

# class PalmPayWebhookMixin:
#     """
#     Mixin class to handle common PalmPay webhook functionality
#     """
    
#     def get_palmpay_client(self):
#         """Get configured PalmPay client from Django settings"""
#         config = PalmPayConfig(
#             merchant_id=settings.PALMPAY_MERCHANT_ID,
#             secret_key=settings.PALMPAY_SECRET_KEY,
#             is_sandbox=settings.PALMPAY_SANDBOX,
#             base_url=getattr(settings, 'PALMPAY_BASE_URL', None),
#             sandbox_url=getattr(settings, 'PALMPAY_SANDBOX_URL', None)
#         )
#         return PalmPayCheckout(config)
    
#     def validate_webhook_signature(self, request_body: str, signature: str, timestamp: str) -> bool:
#         """
#         Validate webhook signature for security
        
#         Args:
#             request_body (str): Raw request body
#             signature (str): Signature from headers
#             timestamp (str): Timestamp from headers
            
#         Returns:
#             bool: True if signature is valid
#         """
#         try:
#             client = self.get_palmpay_client()
#             return client.verify_webhook(request_body, signature, timestamp)
#         except Exception as e:
#             logger.error(f"Signature validation error: {str(e)}")
#             return False

# @method_decorator(csrf_exempt, name='dispatch')
# class PalmPayWebhookView(APIView, PalmPayWebhookMixin):
#     """
#     Django REST Framework view to handle PalmPay webhook notifications
    
#     This view handles all types of payment events from PalmPay including:
#     - Payment successful
#     - Payment failed
#     - Payment pending
#     - Payment cancelled
#     - Refund processed
#     """
    
#     permission_classes = [AllowAny]  # Webhooks don't use standard authentication
    
#     def post(self, request, *args, **kwargs):
#         """
#         Handle incoming webhook notifications from PalmPay
        
#         Expected headers:
#         - X-Signature: HMAC signature for verification
#         - X-Timestamp: Unix timestamp
#         - Content-Type: application/json
#         """
        
#         # Get signature and timestamp from headers
#         signature = request.META.get('HTTP_X_SIGNATURE')
#         timestamp = request.META.get('HTTP_X_TIMESTAMP')
        
#         if not signature or not timestamp:
#             logger.warning("Missing signature or timestamp in webhook headers")
#             return Response(
#                 {"error": "Missing required headers"}, 
#                 status=status.HTTP_400_BAD_REQUEST
#             )
        
#         # Get raw request body for signature verification
#         try:
#             request_body = request.body.decode('utf-8')
#             webhook_data = json.loads(request_body)
#         except (UnicodeDecodeError, json.JSONDecodeError) as e:
#             logger.error(f"Invalid webhook payload: {str(e)}")
#             return Response(
#                 {"error": "Invalid payload format"}, 
#                 status=status.HTTP_400_BAD_REQUEST
#             )
        
#         # Verify webhook signature
#         if not self.validate_webhook_signature(request_body, signature, timestamp):
#             logger.error("Invalid webhook signature")
#             return Response(
#                 {"error": "Invalid signature"}, 
#                 status=status.HTTP_401_UNAUTHORIZED
#             )
        
#         try:
#             # Process the webhook
#             with transaction.atomic():
#                 result = self.process_webhook(webhook_data, signature, timestamp)
                
#             logger.info(f"Webhook processed successfully: {webhook_data.get('eventType')}")
#             return Response({"status": "success", "result": result}, status=status.HTTP_200_OK)
            
#         except PalmPayException as e:
#             logger.error(f"PalmPay webhook error: {str(e)}")
#             return Response(
#                 {"error": f"PalmPay error: {str(e)}"}, 
#                 status=status.HTTP_400_BAD_REQUEST
#             )
#         except Exception as e:
#             logger.error(f"Webhook processing error: {str(e)}")
#             return Response(
#                 {"error": "Internal server error"}, 
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )
    
#     def process_webhook(self, webhook_data: Dict[str, Any], signature: str, timestamp: str) -> Dict[str, Any]:
#         """
#         Process webhook data based on event type
        
#         Args:
#             webhook_data (dict): Webhook payload
#             signature (str): Webhook signature
#             timestamp (str): Webhook timestamp
            
#         Returns:
#             dict: Processing result
#         """
#         client = self.get_palmpay_client()
#         processed_data = client.handle_webhook(webhook_data, signature, timestamp)
        
#         event_type = processed_data['event_type']
#         order_id = processed_data['order_id']
        
#         # Route to specific handler based on event type
#         handlers = {
#             'payment.successful': self.handle_payment_successful,
#             'payment.failed': self.handle_payment_failed,
#             'payment.pending': self.handle_payment_pending,
#             'payment.cancelled': self.handle_payment_cancelled,
#             'refund.successful': self.handle_refund_successful,
#             'refund.failed': self.handle_refund_failed,
#         }
        
#         handler = handlers.get(event_type, self.handle_unknown_event)
#         return handler(processed_data)
    
#     def handle_payment_successful(self, data: Dict[str, Any]) -> Dict[str, Any]:
#         """Handle successful payment webhook"""
#         order_id = data['order_id']
#         transaction_id = data['transaction_id']
#         amount = data['amount']
        
#         try:
#             # Update order status
#             order = Order.objects.get(id=order_id)
#             order.status = 'paid'
#             order.paid_at = datetime.now()
#             order.transaction_id = transaction_id
#             order.save()
            
#             # Create or update payment record
#             payment, created = Payment.objects.get_or_create(
#                 order=order,
#                 defaults={
#                     'amount': amount,
#                     'currency': data['currency'],
#                     'payment_method': data['payment_method'],
#                     'transaction_id': transaction_id,
#                     'status': 'successful',
#                     'gateway_response': data['raw_data']
#                 }
#             )
            
#             if not created:
#                 payment.status = 'successful'
#                 payment.transaction_id = transaction_id
#                 payment.gateway_response = data['raw_data']
#                 payment.save()
            
#             # Create transaction record
#             Transaction.objects.create(
#                 order=order,
#                 transaction_type='payment',
#                 amount=amount,
#                 currency=data['currency'],
#                 transaction_id=transaction_id,
#                 status='successful',
#                 gateway_data=data['raw_data']
#             )
            
#             # Trigger post-payment processing (e.g., send confirmation email, update inventory)
#             self.post_payment_processing(order, payment)
            
#             logger.info(f"Payment successful for order {order_id}: {amount} {data['currency']}")
            
#             return {
#                 'order_id': order_id,
#                 'status': 'processed',
#                 'action': 'payment_successful'
#             }
            
#         except Order.DoesNotExist:
#             logger.error(f"Order not found: {order_id}")
#             raise PalmPayException(f"Order {order_id} not found")
    
#     def handle_payment_failed(self, data: Dict[str, Any]) -> Dict[str, Any]:
#         """Handle failed payment webhook"""
#         order_id = data['order_id']
        
#         try:
#             order = Order.objects.get(id=order_id)
#             order.status = 'payment_failed'
#             order.save()
            
#             # Create or update payment record
#             payment, created = Payment.objects.get_or_create(
#                 order=order,
#                 defaults={
#                     'amount': data['amount'],
#                     'currency': data['currency'],
#                     'payment_method': data.get('payment_method'),
#                     'status': 'failed',
#                     'gateway_response': data['raw_data']
#                 }
#             )
            
#             if not created:
#                 payment.status = 'failed'
#                 payment.gateway_response = data['raw_data']
#                 payment.save()
            
#             # Create transaction record
#             Transaction.objects.create(
#                 order=order,
#                 transaction_type='payment',
#                 amount=data['amount'],
#                 currency=data['currency'],
#                 status='failed',
#                 gateway_data=data['raw_data']
#             )
            
#             # Trigger failure processing (e.g., send failure notification)
#             self.post_payment_failure_processing(order, payment)
            
#             logger.info(f"Payment failed for order {order_id}")
            
#             return {
#                 'order_id': order_id,
#                 'status': 'processed',
#                 'action': 'payment_failed'
#             }
            
#         except Order.DoesNotExist:
#             logger.error(f"Order not found: {order_id}")
#             raise PalmPayException(f"Order {order_id} not found")
    
#     def handle_payment_pending(self, data: Dict[str, Any]) -> Dict[str, Any]:
#         """Handle pending payment webhook"""
#         order_id = data['order_id']
        
#         try:
#             order = Order.objects.get(id=order_id)
#             order.status = 'payment_pending'
#             order.save()
            
#             # Update or create payment record
#             payment, created = Payment.objects.get_or_create(
#                 order=order,
#                 defaults={
#                     'amount': data['amount'],
#                     'currency': data['currency'],
#                     'payment_method': data.get('payment_method'),
#                     'status': 'pending',
#                     'gateway_response': data['raw_data']
#                 }
#             )
            
#             if not created:
#                 payment.status = 'pending'
#                 payment.gateway_response = data['raw_data']
#                 payment.save()
            
#             logger.info(f"Payment pending for order {order_id}")
            
#             return {
#                 'order_id': order_id,
#                 'status': 'processed',
#                 'action': 'payment_pending'
#             }
            
#         except Order.DoesNotExist:
#             logger.error(f"Order not found: {order_id}")
#             raise PalmPayException(f"Order {order_id} not found")
    
#     def handle_payment_cancelled(self, data: Dict[str, Any]) -> Dict[str, Any]:
#         """Handle cancelled payment webhook"""
#         order_id = data['order_id']
        
#         try:
#             order = Order.objects.get(id=order_id)
#             order.status = 'cancelled'
#             order.save()
            
#             # Update payment record
#             payment, created = Payment.objects.get_or_create(
#                 order=order,
#                 defaults={
#                     'amount': data['amount'],
#                     'currency': data['currency'],
#                     'status': 'cancelled',
#                     'gateway_response': data['raw_data']
#                 }
#             )
            
#             if not created:
#                 payment.status = 'cancelled'
#                 payment.gateway_response = data['raw_data']
#                 payment.save()
            
#             logger.info(f"Payment cancelled for order {order_id}")
            
#             return {
#                 'order_id': order_id,
#                 'status': 'processed',
#                 'action': 'payment_cancelled'
#             }
            
#         except Order.DoesNotExist:
#             logger.error(f"Order not found: {order_id}")
#             raise PalmPayException(f"Order {order_id} not found")
    
#     def handle_refund_successful(self, data: Dict[str, Any]) -> Dict[str, Any]:
#         """Handle successful refund webhook"""
#         order_id = data['order_id']
#         transaction_id = data['transaction_id']
#         amount = data['amount']
        
#         try:
#             order = Order.objects.get(id=order_id)
            
#             # Create refund transaction record
#             Transaction.objects.create(
#                 order=order,
#                 transaction_type='refund',
#                 amount=amount,
#                 currency=data['currency'],
#                 transaction_id=transaction_id,
#                 status='successful',
#                 gateway_data=data['raw_data']
#             )
            
#             # Update order if fully refunded
#             total_refunds = Transaction.objects.filter(
#                 order=order, 
#                 transaction_type='refund', 
#                 status='successful'
#             ).aggregate(total=models.Sum('amount'))['total'] or 0
            
#             if total_refunds >= order.total_amount:
#                 order.status = 'refunded'
#                 order.save()
            
#             logger.info(f"Refund successful for order {order_id}: {amount} {data['currency']}")
            
#             return {
#                 'order_id': order_id,
#                 'status': 'processed',
#                 'action': 'refund_successful'
#             }
            
#         except Order.DoesNotExist:
#             logger.error(f"Order not found: {order_id}")
#             raise PalmPayException(f"Order {order_id} not found")
    
#     def handle_refund_failed(self, data: Dict[str, Any]) -> Dict[str, Any]:
#         """Handle failed refund webhook"""
#         order_id = data['order_id']
        
#         try:
#             order = Order.objects.get(id=order_id)
            
#             # Create failed refund transaction record
#             Transaction.objects.create(
#                 order=order,
#                 transaction_type='refund',
#                 amount=data['amount'],
#                 currency=data['currency'],
#                 status='failed',
#                 gateway_data=data['raw_data']
#             )
            
#             logger.error(f"Refund failed for order {order_id}")
            
#             return {
#                 'order_id': order_id,
#                 'status': 'processed',
#                 'action': 'refund_failed'
#             }
            
#         except Order.DoesNotExist:
#             logger.error(f"Order not found: {order_id}")
#             raise PalmPayException(f"Order {order_id} not found")
    
#     def handle_unknown_event(self, data: Dict[str, Any]) -> Dict[str, Any]:
#         """Handle unknown webhook events"""
#         event_type = data['event_type']
#         order_id = data['order_id']
        
#         logger.warning(f"Unknown webhook event: {event_type} for order {order_id}")
        
#         return {
#             'order_id': order_id,
#             'status': 'ignored',
#             'action': f'unknown_event_{event_type}'
#         }
    
#     def post_payment_processing(self, order, payment):
#         """
#         Handle post-payment processing tasks
#         Override this method in your implementation
        
#         Args:
#             order: Order instance
#             payment: Payment instance
#         """
#         # Example post-processing tasks:
#         # - Send confirmation email
#         # - Update inventory
#         # - Trigger fulfillment process
#         # - Send webhook to other services
#         pass
    
#     def post_payment_failure_processing(self, order, payment):
#         """
#         Handle post-payment failure processing tasks
#         Override this method in your implementation
        
#         Args:
#             order: Order instance
#             payment: Payment instance
#         """
#         # Example failure processing tasks:
#         # - Send failure notification email
#         # - Release reserved inventory
#         # - Log for manual review
#         pass

# class PalmPayWebhookTestView(APIView, PalmPayWebhookMixin):
#     """
#     Test view for debugging webhook integration
#     Use this only in development/testing environments
#     """
    
#     permission_classes = [AllowAny]
    
#     def post(self, request, *args, **kwargs):
#         """Test webhook processing without signature verification"""
        
#         if not settings.DEBUG:
#             return Response(
#                 {"error": "Test endpoint only available in debug mode"}, 
#                 status=status.HTTP_403_FORBIDDEN
#             )
        
#         try:
#             webhook_data = request.data
            
#             # Process without signature verification (for testing)
#             client = self.get_palmpay_client()
            
#             # Simulate processed webhook data
#             processed_data = {
#                 'event_type': webhook_data.get('eventType'),
#                 'order_id': webhook_data.get('data', {}).get('orderId'),
#                 'status': webhook_data.get('data', {}).get('status'),
#                 'amount': webhook_data.get('data', {}).get('amount'),
#                 'currency': webhook_data.get('data', {}).get('currency'),
#                 'transaction_id': webhook_data.get('data', {}).get('transactionId'),
#                 'payment_method': webhook_data.get('data', {}).get('paymentMethod'),
#                 'timestamp': str(int(datetime.now().timestamp())),
#                 'raw_data': webhook_data
#             }
            
#             # Create a temporary webhook view instance to process
#             webhook_view = PalmPayWebhookView()
#             webhook_view.process_webhook = lambda data, sig, ts: processed_data
            
#             result = webhook_view.process_webhook(webhook_data, 'test_signature', 'test_timestamp')
            
#             return Response({
#                 "status": "test_success", 
#                 "processed_data": processed_data,
#                 "result": result
#             }, status=status.HTTP_200_OK)
            
#         except Exception as e:
#             logger.error(f"Test webhook error: {str(e)}")
#             return Response(
#                 {"error": f"Test error: {str(e)}"}, 
#                 status=status.HTTP_400_BAD_REQUEST
#             )