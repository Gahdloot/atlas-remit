
from django.urls import path
from account import views


urlpatterns = [ 
    path('', views.WelcomeTestEmailView.as_view(), name='welcome-email'), # testing path

    path('get-started/', views.WelcomeEmailView.as_view(), name='welcome-email'),
    
    # Resend email endpoint
    path('resend-email/', views.ResendEmailView.as_view(), name='resend-email'),
    
    # Payment request creation
    path('payment-requests/', views.SchoolPaymentRequestCreateView.as_view(), name='payment-requests'),
    
    # One-time virtual account generation
    path('get-one-time-account/', views.OneTimeVirtualAccountView.as_view(), name='one-time-account'),
    
    # Payment verification
    path('verify-payment/', views.PaymentVerificationView.as_view(), name='verify-payment'),
]