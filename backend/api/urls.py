
from django.urls import path
from account import views

urlpatterns = [
    # Create and list payment requests
    path('payment-requests/', views.SchoolPaymentRequestCreateView.as_view(), name='payment-requests'),
    
    # Get specific payment request
    path('payment-requests/<uuid:payment_id>/', views.get_payment_request, name='get-payment-request'),
    
    # Update payment status
    path('payment-requests/<uuid:payment_id>/status/', views.update_payment_status, name='update-payment-status'),
]